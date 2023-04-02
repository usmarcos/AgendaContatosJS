import { DeleteContactService } from "../services/contact.service.js"
import { Header } from "../components/header.component.js"

/** 
 * Refeito e passando o cardContact para poder ser selecionado, pois o uso do clonenode gerou erros
 */

const eventos = async (contato, cardContact, validationContainer) => {
    const [anchorDelete] = cardContact.querySelectorAll('a')

    anchorDelete.addEventListener('click', async (e) => {
        e.preventDefault()
        const anchorDelete = window.confirm(`Deseja deletar o contato ${contato.nome}?`)
        if (anchorDelete) {
            try {
                await DeleteContactService(contato.id)
                const mensagem = `Contato ${contato.nome} excluído com sucesso!`
                validationMessage(mensagem, true, validationContainer)
                cardContact.remove()
                console.log(mensagem)
            } catch (error) {
                console.log(error)
                const mensagem = `Erro ao excluir contato ${contato.nome}`
                validationMessage(mensagem, false, validationContainer)
            }
        }
    })
}

export const CardContact = (contato) => {
    const root = document.getElementById('root')
    const validationContainer = document.createElement('div')
    validationContainer.setAttribute('id', 'validation-container')
    root.append(Header(), validationContainer)

    const cardContact = document.createElement('div')
    cardContact.setAttribute('id', 'c-card-contact')

    cardContact.innerHTML = `
        <p id="c-p">${contato.nome}</p>
        <div id="c-opcoes">
            <a href="#contacts" id="c-deletar">Deletar</a>
            <a href="?id-contact=${contato.id}#contact-details" id="c-visualizar">Visualizar</a>
        </div>
    `

    eventos(contato, cardContact, validationContainer)

    return cardContact
}

function validationMessage(retorno, status, validationContainer) {
    const mensagem = retorno
    const alerta = document.createElement('div')
    alerta.textContent = mensagem
    alerta.classList.add('alerta')
    //se for true ele vai setar um fundo verde de sucesso
    if (status) {
        alerta.style.backgroundColor = 'green'
        alerta.style.color = '#ffffff'
    }
    validationContainer.appendChild(alerta)

    setTimeout(() => {
        alerta.remove()
    }, 5000)
}
