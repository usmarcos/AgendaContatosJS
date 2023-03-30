import { signupService } from "../services/userSignup.service.js"

const signup = document.createElement("form")
signup.setAttribute("id", "p-signup")

//quando submiter o evento de escuta vai enviar o formData como objeto para o back
const eventos = () => {
    signup.addEventListener('submit', (e) => {
        e.preventDefault()
        const fd = new FormData(signup)
        const dados = Object.fromEntries(fd)
        //chamo o service para realizar a autenticação, como o fetch retorna promisse eu trato abaixo
        signupService(dados)
            .then((response) => {
                console.log(response)                
                //apesar de não ser 200 ele cai como then, então estou tratando
                if (response.status === 409) {
                    validationMessage(response, false)
                }
                if (response.status === 200) {
                    response.mensagem = "Usuário cadastrado com sucesso!"
                    validationMessage(response, true)
                    setTimeout(() => {
                        window.location.href = "#login"
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
export const Signup = () => {
    signup.innerHTML = `
    <div id = "imgLogin">
    <img src="https://cdn-icons-png.flaticon.com/512/6313/6313563.png" alt="Agenda">
    </div>
    <label for="nome">Nome Completo</label>
    <input type="text" name="nome" id="nome" required>

    <label for="email">E-mail</label>
    <input type="email" name="email" id="email" required>

    <label for="senha">Senha</label>
    <input type="password" name="senha" id="senha" required>

    <button type="submit">Entrar</button>
    <p><a href="#login">Já tem conta? Faça o login.</a></p>
    `
    eventos()
    return signup
}

function validationMessage(retorno, status) {
    const mensagem = retorno.mensagem
    const alerta = document.createElement('div')
    alerta.textContent = mensagem
    alerta.classList.add('alerta')
    //se for falso ele vai setar um fundo verde de sucesso
    if(status){
        alerta.style.backgroundColor = 'green'
        alerta.style.color = '#ffffff'
    }
    signup.appendChild(alerta)

    setTimeout(() => {
        alerta.remove()
    }, 5000)
}