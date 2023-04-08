// import {  } from "./user.ts";
import { MongoClient, Context, Application, Router, UserRouter, Middleware } from "../../deps.ts";

const movsForm = document.querySelector('#movsForm') as HTMLFormElement;
const loginForm = document.querySelector('#loginForm') as HTMLFormElement;
const userRegisterForm = document.querySelector(
    '#userRegisterForm'
) as HTMLFormElement;
const exit = document.querySelector('#exit') as HTMLButtonElement;
const movsTable = document.querySelector('#movsTable') as HTMLTableElement;
const totalBalance = document.querySelector('#totalBalance') as HTMLDivElement;
const averageIncomes = document.querySelector(
    '#averageIncomes'
) as HTMLDivElement;
const averageExpenses = document.querySelector(
    '#averageExpenses'
) as HTMLDivElement;
const title = document.querySelector('#title') as HTMLTitleElement;
const showLogin = document.querySelector('#showLogin') as HTMLButtonElement;
const showUserRegister = document.querySelector(
    '#showUserRegister'
) as HTMLButtonElement;

const client = new MongoClient();
await client.connect('mongodb://localhost:27017');

const db = client.database('creda');
const User = db.collection('User');

showLogin.addEventListener('click', showLoginForm);
showUserRegister.addEventListener('click', showUserRegisterForm);

function checkUserIsLoggedIn(): Promise<void> | boolean {
    try {
        const ctx: Context = new Context();
        const next: UserRouter = new UserRouter();
        return Middleware.isAuthenticated(ctx, next);
        // return localStorage.getItem('logado');
    } catch (error) {
        console.error(error);
    }

    return false;
}

function showLoginForm(): boolean {
    try {
        title.innerText = 'Login';
        loginForm.style.display = 'block';
        userRegisterForm.style.display = 'none';
        movsForm.style.display = 'none';
        exit.style.display = 'none';
        movsTable.style.display = 'none';
        totalBalance.style.display = 'none';
        averageIncomes.style.display = 'none';
        averageExpenses.style.display = 'none';

        const exibindo: boolean =
            loginForm.offsetParent !== userRegisterForm.offsetParent;
        return exibindo;
    } catch (error) {
        console.error(error);
    }

    return false;
}

function showUserRegisterForm(): boolean {
    try {
        title.innerText = 'Sign Up';
        userRegisterForm.style.display = 'block';
        loginForm.style.display = 'none';
        movsForm.style.display = 'none';
        exit.style.display = 'none';
        movsTable.style.display = 'none';
        totalBalance.style.display = 'none';
        averageIncomes.style.display = 'none';
        averageExpenses.style.display = 'none';

        const exibindo: boolean =
            loginForm.offsetParent !== userRegisterForm.offsetParent;

        return exibindo;
    } catch (error) {
        console.error(error);
    }

    return false;
}

function showWelcome() {
    try {
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        const email = localStorage.getItem('logado');
        const nome = usuarios[email]['nome'];

        title.innerText = `Bem-vindo ${nome}!`;
        userRegisterForm.style.display = 'none';
        loginForm.style.display = 'none';
        movsForm.style.display = 'block';
        exit.style.display = 'block';
        movsTable.style.display = 'contents';

        return listaMovs();
    } catch (error) {
        console.error(error);
    }

    return false;
}

window.onload = (): void => {
    const formOculto = loginForm.style.display !== 'block';
    const logado = checkUserIsLoggedIn();

    if (!logado) {
        if (formOculto) {
            showLoginForm();
        }
    } else {
        showWelcome();
    }
};
