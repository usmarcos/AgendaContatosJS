//import as pages
import { NotFound } from "./scripts/pages/404.page.js";
import { Login } from "./scripts/pages/login.page.js";
import { Signup } from "./scripts/pages/signup.page.js";
//rotas com as hash correspondentes
const ROUTER = {
    "#login": { component: Login, private: false },
    "#404": { component: NotFound, private: false },
    "#signup": { component: Signup, private: false }
}

function redirectPage() {
    const root = document.querySelector('#root')
    //recupero a rota que estou acessando naquele momento. Caso ela não exista vai setar na rota 404.
    const route = ROUTER[window.location.hash] || ROUTER["#404"]
    //vai limpar o root e depois vai apendar o componente da seleção acima
    root.innerHTML = ""
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