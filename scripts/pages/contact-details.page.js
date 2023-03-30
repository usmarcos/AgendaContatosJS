import { Header } from "../components/header.component.js"
import { GetContactService } from "../services/contact.service.js"

const root = document.querySelector('#root')
const contactDetails = document.createElement('div')
contactDetails.setAttribute('id', 'p-contacts-details')

const eventos = () => {
  //pega a URL que foi redirecionada
  const url = new URL(window.location.href)
  const parametros = url.searchParams
  const idContato = parametros.get('id-contact')
  GetContactService(idContato)
    .then(({ data }) => {
      contactDetails.innerHTML += `
      <div class="informacoes-pessoais">
      <h2>Informações Pessoais</h2>
      <p><b>Nome:</b> <i>${data.nome}</i></p>
      <p><b>Apelido:</b> <i>${data.apelido}</i></p>
      <p><b>E-mail:</b> <i>${data.email}</i></p>
      <p><b>Notas:</b> <i>${data.notas}</i></p>
    </div>
    
    <div class="endereco">
      <h2>Endereço</h2>
      <p><b>Logradouro:</b> <i>${data.endereco.logradouro}</i></p>
      <p><b>Cidade:</b> <i>${data.endereco.cidade}</i></p>
      <p><b>Estado:</b> <i>${data.endereco.estado}</i></p>
      <p><b>CEP:</b> <i>${data.endereco.cep}</i></p>
      <p><b>País:</b> <i>${data.endereco.pais}</i></p>
    </div>
    
    <div class="telefone">
      <h2>Telefone</h2>
      <ul>
        ${data.telefones.map(telefone => `
          <li>
            <p><b>Tipo:</b> <i>${telefone.tipo}</i></p>
            <p><b>Número:</b> <i>${telefone.numero}</i></p>
          </li>
        `).join('')}
      </ul>
    </div> `
    })
    .catch(() => {
      console.log(erro)
    })
}

export const ContactsDetails = () => {
  root.append(Header())

  //colocando "/" para ser redirecionar ao link absoluto e descartar o id.
  contactDetails.innerHTML = `
  <h1>Detalhes do contato</h1>
  <a href="/#contacts">Voltar para lista de contatos</a>
  `
  eventos()
  return contactDetails
}