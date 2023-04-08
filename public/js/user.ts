const logoutButton = document.querySelector('#logoutButton') as HTMLButtonElement;
const registerName = document.querySelector(
    '#registerName'
) as HTMLInputElement;
const registerEmail = document.querySelector(
    '#registerEmail'
) as HTMLInputElement;
const registerPassword = document.querySelector(
    '#registerPassword'
) as HTMLInputElement;
const initialBalance = document.querySelector(
    '#initialBalance'
) as HTMLInputElement;
const registerUserButton = document.querySelector(
    '#registerUserButton'
) as HTMLButtonElement;
const loginEmail = document.querySelector('#loginEmail') as HTMLInputElement;
const loginPassword = document.querySelector(
    '#loginPassword'
) as HTMLInputElement;
const loginButton = document.querySelector('#loginButton') as HTMLButtonElement;

const msg = document.querySelector('#msg') as HTMLDivElement;

logoutButton.addEventListener('click', logout);
registerUserButton.addEventListener('click', registerUser);
loginButton.addEventListener('click', userLogin);

function validateUserRegisterForm(): boolean {
    const name: string = registerName.value.trim();
    const email: string = registerEmail.value.trim();
    const password: string = registerPassword.value.trim();
    const balance: number = parseFloat(initialBalance.value.trim());
    let valid = true;

    if (name === '') {
        msg.innerText = 'Please, inform your name.';
        valid = false;
    }

    if (email === '' || !email.includes('@')) {
        msg.innerText = 'Please, inform a valid email.';
        valid = false;
    }

    if (password === '') {
        msg.innerText = 'Please, inform your password.';
        valid = false;
    }

    if (!balance) {
        msg.innerText =
            'Please, inform a valid value for your initial balance.';
        valid = false;
    }

    msg.innerText = '';
    return valid;
}

function validateLoginForm(): boolean {
    const email: string = loginEmail.value.trim();
    const password: string = loginPassword.value.trim();
    let valid = true;

    if (email === '' || !email.includes('@')) {
        msg.innerText = 'Please, inform a valid email.';
        valid = false;
    }

    if (password === '') {
        msg.innerText = 'Please, inform your password.';
        valid = false;
    }

    msg.innerText = '';
    return valid;
}

function registerUser(event: MouseEvent) {
    event.preventDefault();

    msg.innerText = '';

    if (validateUserRegisterForm()) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
        //   const hashSenha = hashSenha(registerPassword.value);
        const novoUsuario = {
            [registerEmail.value]: {
                nome: registerName.value,
                //   password: hashSenha,
                password: registerPassword.value,
                balance: initialBalance.value || 0.0
            }
        };

        try {
            if (usuarios[registerEmail.value]) {
                msg.innerText = 'Usuário já possui cadastro!';
                return showLogin();
            }

            // usuarios.push(novoUsuario);
            const usuariosComNovo = Object.assign({}, usuarios, novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuariosComNovo));
            usuarios = JSON.parse(localStorage.getItem('usuarios'));
            if (usuarios[registerEmail.value]) {
                msg.innerText = 'Usuário cadastrado com sucesso!';

                return true;
            }
        } catch (error) {
            console.error(error);
        }
        return false;
    }

    return false;
}

function userLogin(event: MouseEvent) {
    // JSON.parse(localStorage.getItem('usuarios'))['teste@borjovsky.com']['nome']
    event.preventDefault();
    if (validateLoginForm()) {
        try {
            const visitante = {
                email: loginEmail.value,
                password: loginPassword.value
            };

            // const hashSenhaVisitante = hashSenha(visitante['password']);
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const existente = usuarios[visitante['email']];

            // if (existente && existente['password'] == hashSenhaVisitante) {
            if (existente && existente['password'] == visitante['password']) {
                localStorage.setItem('logado', visitante['email']);

                return showWelcome();
            }
            msg.innerText =
                !visitante['email'] || !visitante['password']
                    ? 'Email e password obrigatórios'
                    : 'Usuário não cadastrado!';
            // return mostraCadastroUsuario();
            return false;
        } catch (error) {
            console.error(error);
        }
    }

    return false;
}

function logout(event: MouseEvent) {
    event.preventDefault();
    try {
        localStorage.removeItem('logado');
        showLogin();

        return !checkUserIsLoggedIn();
    } catch (error) {
        console.error(error);
    }

    return false;
}
