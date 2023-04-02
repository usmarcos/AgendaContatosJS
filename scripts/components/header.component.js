const header = document.createElement('header')
header.setAttribute('id', 'c-header')

const eventos = () => {
    const sair = header.querySelector('a')
    sair.addEventListener('click', (e) => {
        e.preventDefault
        sessionStorage.removeItem('@token')
        sessionStorage.removeItem('@user')
        window.location.href = '#login'
    })
}
export const Header = () => {
    const usuario = JSON.parse(sessionStorage.getItem('@user'))
    // ? optional chaining, acessando uma propriedade que talvez não exista, daí não gera erro se ele tiver underfined
    header.innerHTML = `
        <span><b>Usuário</b>: <i>${usuario?.nome}</i></span>
        <a href = "#login">Sair</a>
    `
    eventos()
    return header
}