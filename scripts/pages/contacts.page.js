import { Header } from "../components/header.component.js"
import { GetAllContactsService } from "../services/contact.service.js"
import { CardContact } from "../components/card-contact.component.js"

const root = document.querySelector('#root')
const contacts = document.createElement('div')
contacts.setAttribute('id', 'p-contacts')

const eventos = () => {
    //desestruturação {data}
    GetAllContactsService()
        .then((contatos) => {
            console.log(contatos)
            const divContatos = contacts.querySelector('#contatos')
            // verifica se contatos.data existe antes de chamar o método forEach()
            if (contatos && contatos.data) {
                contatos.data.forEach((contato) => {
                    const cardContact = CardContact(contato)
                    divContatos.appendChild(cardContact)
                })
            }
        })
        .catch((erro) => {
            console.log(erro)
        })
}


export const Contacts = () => {
    //sempre que vir nessa página vai garantir que a url seja essa
    window.location.href='#contacts'

    root.append(Header())
    contacts.innerHTML = `
    <h1> Contatos </h1>
    <div id="contatos"></div>
    `
    eventos()
    return contacts
}