//import as pages
import { NotFound } from "./scripts/pages/404.page.js";
import { ContactsDetails } from "./scripts/pages/contact-details.page.js";
import {Contacts } from "./scripts/pages/contacts.page.js";
import { AddContact} from "./scripts/pages/add-contact.page.js";
import { Login } from "./scripts/pages/login.page.js";
import { Signup } from "./scripts/pages/signup.page.js";
//rotas com as hash correspondentes
const ROUTER = {
    "#404": { component: NotFound, private: undefined }, //undefined para poder validar se der 404 e ele estiver ou não logado
    "#login": { component: Login, private: false },
    "#signup": { component: Signup, private: false },
    "#contacts": { component: Contacts, private: true },
    "#add-contact": { component: AddContact, private: true },
    "#contact-details": { component: ContactsDetails, private: true }
}

function isTokenExpired(token) {
    if (!token) return true
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp
    return (Math.floor((new Date).getTime() / 1000)) >= expiry
}

function redirectPage() {
    const root = document.querySelector('#root')
    //recupero a rota que estou acessando naquele momento. Caso ela não exista vai setar na rota 404.
    const route = ROUTER[window.location.hash] || ROUTER["#404"]
    const token = sessionStorage.getItem('@token')

    //regras de navegação (valida se o usuário for privado vai sempre voltar a contato, mas se não volta pra login)
    if (route.private !== undefined) {
        const isPrivateNotLogged = route.private === true && !token
        const isPrivateTokenExpired = route.private === true && isTokenExpired(token)

        if (isPrivateNotLogged || isPrivateTokenExpired) {
            sessionStorage.removeItem('@token')
            sessionStorage.removeItem('@user')
            window.location.href = '/#login'
            return
        }

        const isPublicIsLogged = route.private === false && token

        if (isPublicIsLogged) {
            window.location.href = '/#contacts'
            return
        }
    }
    
    //vai limpar o root e depois vai apendar o componente da seleção acima
    root.innerHTML = ''
    root.append(route.component())
}

//carrega a pag e chamo a função redirect
window.addEventListener("load", () => {
    if (!window.location.hash) {
        window.location.href = "#login"
    }
    
    redirectPage()
    //sempre que trocar a hash ele vai recarregar a página
    window.addEventListener("hashchange", redirectPage)
})