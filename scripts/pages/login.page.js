import { loginService } from "../services/auth.service.js"

const login = document.createElement("form")
login.setAttribute("id", "p-login")

//quando submiter o evento de escuta vai enviar o formData como objeto para o back
const eventos = () => {
    login.addEventListener('submit', (e) => {
        e.preventDefault()
        const fd = new FormData(login)
        const dados = Object.fromEntries(fd)
        //chamo o service para realizar a autenticação, como o fetch retorna promisse eu trato abaixo
        loginService(dados)
            .then((response) => {
                console.log(response)
                if (response.status === 401) {
                    validationMessage(response, false)
                }
                if (response.status === 200) {
                    //desestruturo o response para poder obter o user e armazenar no localstorage
                    const { token, ...dadosUsuario } = response.data
                    sessionStorage.setItem('@token', token)
                    //converto ele para string e poder armazenar como string no banco local
                    window.sessionStorage.setItem('@user', JSON.stringify(dadosUsuario))
                    response.mensagem = "Login validado, você está sendo redirecionado..."
                    validationMessage(response, true)
                    setTimeout(() => {
                        window.location.href = '#contacts'
                      }, 3000)                 
                }
            })
            .catch((erro) => {
                console.log(erro)                
                if(erro.status === 404){
                    validationMessage(erro, false)
                }else{
                    erro.mensagem = "Não foi possível realizar uma conexão com o servidor."
                    validationMessage(erro, false)
                }
            })
    })
}

//componentes
//export é para exportar para quem quiser importar ela
export const Login = () => {
    login.innerHTML = `
    <div id = "imgLogin">
    <img src="https://cdn-icons-png.flaticon.com/512/6313/6313563.png" alt="Agenda">
    </div>

    <label for="email">E-mail</label>
    <input type="email" name="email" id="email" required>

    <label for="senha">Senha</label>
    <input type="password" name="senha" id="senha" required>

    <fieldset>
        <input type="checkbox" name="salvar" id="salvar"  value="salvar">
        <label for="salvar">Salvar login?</label>       
    </fieldset>
    
    <button type="submit">Entrar</button>

    <p><a href="#signup">Ainda não tem conta? Crie aqui!</a></p>
    `
    eventos()
    return login
}

function validationMessage(retorno, status) {
    const mensagem = retorno.mensagem
    const alerta = document.createElement('div')
    alerta.textContent = mensagem
    alerta.classList.add('alerta')
    //se for true ele vai setar um fundo verde de sucesso
    if(status){
        alerta.style.backgroundColor = 'green'
        alerta.style.color = '#ffffff'
    }
    login.appendChild(alerta)

    setTimeout(() => {
        alerta.remove()
    }, 5000)
}