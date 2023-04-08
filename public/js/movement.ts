const movsForm = document.querySelector('#movsForm') as HTMLFormElement;
const movTitle = document.querySelector('#movTitle') as HTMLTitleElement;
const value = document.querySelector('#value') as HTMLInputElement;
const description = document.querySelector('#description') as HTMLInputElement;
const create = document.querySelector('#create') as HTMLButtonElement;
const note = document.querySelector('#note') as HTMLParagraphElement;
const movsDiv = document.querySelector('#movsDiv') as HTMLDivElement;
const movsTable = document.querySelector('#movsTable') as HTMLTableElement;
const totalBalance = document.querySelector('#totalBalance') as HTMLDivElement;
const averageIncomes = document.querySelector(
    '#averageIncomes'
) as HTMLDivElement;
const averageExpenses = document.querySelector(
    '#averageExpenses'
) as HTMLDivElement;
const msg = document.querySelector('#msg') as HTMLDivElement;

create.addEventListener('click', createMov);
// alterar.addEventListener('click', alteraMov);

function validaFormMov() {
    let val = valor.value.trim();
    let desc = descricao.value.trim();
    let valid = true;

    if (val === '' || isNaN(val)) {
        msg.innerText = 'Please, digite um valor válido.';
        valid = false;
    }

    if (desc === '') {
        msg.innerText = 'Please, digite uma descrição.';
        valid = false;
    }

    msg.innerText = '';
    return valid;
}

// funciona, mas tem alguma cagada por questão de assync ou alguma merda dessa
function criaMov(event) {
    event.preventDefault();
    if (validaFormMov()) {
        try {
            const logado = localStorage.getItem('logado');
            const novaMov = {
                valor: valor.value,
                descricao: descricao.value
            };
            const todasMovs = JSON.parse(localStorage.getItem('movs'));

            if (todasMovs) {
                if (todasMovs.hasOwnProperty(logado)) {
                    todasMovs[logado].push(novaMov);
                } else {
                    todasMovs.push({ [logado]: novaMov });
                }
                localStorage.setItem('movs', JSON.stringify(todasMovs));
            } else {
                localStorage.setItem(
                    'movs',
                    JSON.stringify({ [logado]: novaMov })
                );
            }

            if (
                Object.entries(JSON.parse(localStorage.getItem('movs'))[logado])
                    .length === 0
            ) {
                return false;
            }
            let texto = valor.value >= 0.0 ? 'Receita' : 'Despesa';
            texto += ' cadastrada com sucesso!';
            msg.innerText = texto;
            return true;
        } catch (error) {
            console.error(error);
        }
    }

    return false;
}

function formMovAltera(event, id) {
    event.preventDefault();
    // debugger
    const logado = localStorage.getItem('logado');
    const todosMovs = JSON.parse(localStorage.getItem('movs'));
    const movsLogado = todosMovs[logado];
    const movAlterar = movsLogado[id];
    valor.value = movAlterar['valor'];
    descricao.value = movAlterar['descricao'];
    criar.innerText = 'Alterar';
    criar.value = 'alterar';
    criar.removeEventListener('click', criaMov);
    criar.addEventListener('click', (event) => {
        alteraMov(event, id, logado, todosMovs, movsLogado, movAlterar);
    });
}

function alteraMov(event, id, logado, todosMovs, movsLogado, movAlterar) {
    event.preventDefault();
    try {
        // debugger
        if (validaFormMov()) {
            const novosDados = {
                valor: valor.value,
                descricao: descricao.value
            };
            movAlterar['valor'] = novosDados['valor'];
            movAlterar['descricao'] = novosDados['descricao'];
            movsLogado[id] = movAlterar;
            todosMovs[logado] = movsLogado;
            localStorage.setItem('movs', JSON.stringify(todosMovs));

            // busca de novo a movimentação alterada
            const movAlterado = JSON.parse(localStorage.getItem('movs'))[
                logado
            ][id];
            if (
                movAlterado['valor'] === novosDados['valor'] &&
                movAlterado['descricao'] === novosDados['descricao']
            ) {
                msg.innerText = 'Movimentação alterada com sucesso!';
                criar.removeEventListener('click', alteraMov);
                criar.addEventListener('click', criaMov);
                mostraBemVindo();
                return true;
            }
        }
    } catch (error) {
        console.error(error);
    }

    return false;
}

function deletaMov(event, id) {
    event.preventDefault();
    try {
        const logado = localStorage.getItem('logado');
        let movs = JSON.parse(localStorage.getItem('movs'));
        delete movs[logado][id];
        localStorage.setItem('movs', JSON.stringify(movs));

        movs = JSON.parse(localStorage.getItem('movs'));
        if (!movs[logado][id]) {
            msg.innerText = 'Movimentação deletada com sucesso!';
            return true;
        }
    } catch (error) {
        console.error(error);
    }

    return false;
}

function limpaTabelaMovs() {
    const tabela = document.querySelector('#tabelaMovs');
    const rows = tabela.rows;

    for (let i = rows.length - 1; i >= 1; i--) {
        tabela.deleteRow(i);
    }
    balanceTotal.innerText = 'Saldo Total:';
    mediaDespesas.innerText = 'Média de despesas:';
}

function listaMovs() {
    try {
        const logado = localStorage.getItem('logado');
        const movsLogado =
            JSON.parse(localStorage.getItem('movs'))[logado] || {};

        if (!Array.isArray(movsLogado) || movsLogado.length === 0) {
            return false;
        }

        limpaTabelaMovs();
        movsLogado.forEach((m, i) => {
            if (!m) {
                return;
            }
            const linha = document.createElement('tr');
            const valor = document.createElement('td');
            const descricao = document.createElement('td');
            const celulaAlterar = document.createElement('td');
            const celulaDeletar = document.createElement('td');
            const alterar = document.createElement('button');
            const deletar = document.createElement('button');
            const lapis = document.createElement('img');
            const lixeira = document.createElement('img');

            lapis.src = 'pencil.png';
            lixeira.src = 'trash.png';
            celulaAlterar.id = 'alterar_' + i;
            celulaDeletar.id = 'deletar_' + i;
            alterar.type = 'submit';
            deletar.type = 'submit';

            celulaAlterar.appendChild(alterar);
            celulaDeletar.appendChild(deletar);
            alterar.appendChild(lapis);
            deletar.appendChild(lixeira);

            celulaAlterar.addEventListener('click', (event) => {
                formMovAltera(event, i);
            });
            celulaDeletar.addEventListener('click', (event) => {
                deletaMov(event, i);
            });

            valor.innerText = m['valor'];
            descricao.innerText = m['descricao'];
            linha.appendChild(valor);
            linha.appendChild(descricao);
            linha.appendChild(celulaAlterar);
            linha.appendChild(celulaDeletar);
            tabelaMovs.appendChild(linha);
        });

        calculaSaldoTotal();
        calculaMediaDespesas();
        return true;
    } catch (error) {
        console.error(error);
    }

    return false;
}

function hashSenha(password) {
    try {
        // Hash password using SHA-256
        const sha256 = window.crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(password)
        );

        // Convert hash to hex string
        const hashArray = Array.from(new Uint8Array(sha256));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');

        return hashHex;
    } catch (error) {
        console.error(error);
    }

    return false;
}

function calculaSaldoTotal() {
    try {
        const logado = localStorage.getItem('logado');
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        const balanceAtual = parseFloat(usuarios[logado]['balance']);
        const movsLogado = JSON.parse(localStorage.getItem('movs'))[logado];
        const novoSaldo = movsLogado.reduce((acc, item) => {
            return item && item['valor']
                ? acc + parseFloat(item['valor'])
                : acc;
        }, balanceAtual);
        balanceTotal.innerText +=
            ' ' +
            novoSaldo.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        return novoSaldo;
    } catch (error) {
        console.error(error);
    }
    return 0.0;
}

function calculaMediaDespesas() {
    try {
        const logado = localStorage.getItem('logado');
        const movsLogado = JSON.parse(localStorage.getItem('movs'))[logado];
        let qtdDespesas = movsLogado.filter((obj) => {
            if (obj && obj.valor) {
                return parseInt(obj.valor) < 0.0;
            }
        }).length;
        const somaDespesas = movsLogado.reduce((acc, curr) => {
            if (curr && curr['valor']) {
                const valor = parseFloat(curr['valor']);
                return valor < 0.0 ? acc + valor : acc;
            } else {
                return acc;
            }
        }, 0.0);
        const media = somaDespesas / qtdDespesas;
        mediaDespesas.innerText +=
            ' ' +
            media.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        return media;
    } catch (error) {
        console.error(error);
    }
    return 0.0;
}
