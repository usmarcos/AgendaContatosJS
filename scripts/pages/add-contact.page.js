import { Header } from "../components/header.component.js"
import { AddContactService } from "../services/contact.service.js"

const root = document.querySelector('#root')
const addContact = document.createElement('form')
addContact.setAttribute('id', 'p-add-contact')

const eventos = () => {
    addContact.addEventListener('submit', (e) => {
        e.preventDefault()

        const fd = new FormData(addContact)
        const dadosDoFormulario = Object.fromEntries(fd)
        //cria o atributo telefones e remove o que o objeto não espera
        dadosDoFormulario.telefones = [
            { tipo: dadosDoFormulario['tipo-telefone-1'], numero: dadosDoFormulario['numero-1'] },
            { tipo: dadosDoFormulario['tipo-telefone-2'], numero: dadosDoFormulario['numero-2'] },
            { tipo: dadosDoFormulario['tipo-telefone-3'], numero: dadosDoFormulario['numero-3'] }
        ]
        //só vai manter no dadosFormulario os telefones que tem número
        dadosDoFormulario.telefones = dadosDoFormulario.telefones.filter((telefone)=>{
            return telefone.numero !== ''
        })

        delete dadosDoFormulario['tipo-telefone-1']
        delete dadosDoFormulario['tipo-telefone-2']
        delete dadosDoFormulario['tipo-telefone-3']
        delete dadosDoFormulario['numero-1']
        delete dadosDoFormulario['numero-2']
        delete dadosDoFormulario['numero-3']

        //endereço
        dadosDoFormulario.endereco = {
            logradouro: dadosDoFormulario['logradouro'],
            cidade: dadosDoFormulario['cidade'],
            estado: dadosDoFormulario['estado'],
            cep: dadosDoFormulario['cep'],
            pais: dadosDoFormulario['pais']
        }

        delete dadosDoFormulario['logradouro']
        delete dadosDoFormulario['cidade']
        delete dadosDoFormulario['estado']
        delete dadosDoFormulario['cep']
        delete dadosDoFormulario['pais']

        AddContactService(dadosDoFormulario)
        .then((response)=>{
            if(response.status === 401){
                validationMessage(response, false)
                console.log(response)
            }else{
                const retorno = `Contato cadastrado com sucesso`
                validationMessage(retorno, true)
                setTimeout(()=>{
                    window.open('/#contacts', '_self')
                },2000                )
            }
        })     
    })
}

export const AddContact = () => {
    root.append(Header())

    //colocando "/" para ser redirecionar ao link absoluto e descartar o id.
    addContact.innerHTML = `
    <div id="cabecalho">
    <h1>Novo contato</h1>
    <a href="/#contacts">Voltar para contatos</a>
</div>
  <fieldset>
  <legend>Dados pessoais</legend>
  <input placeholder="Nome *" name="nome" type="text" required/>
  <input placeholder="Apelido" name="apelido" type="text" />
  <input placeholder="E-mail*" name="email" type="email"  required/>
  <textarea placeholder="Nota" name="notas" /></textarea>
</fieldset>
<fieldset>
  <legend>Endereço</legend>
  <input placeholder="Logradouro" name="logradouro" type="text" />
  <input placeholder="Cidade" name="cidade" type="text" />
  <input placeholder="Estado" name="estado" type="text" />
  <input placeholder="CEP" name="cep" type="text" />
  <input placeholder="País" name="pais" type="text" />
</fieldset>
  
<fieldset>
  <legend>Telefones</legend>
  <select name="tipo-telefone-1">
      <option value="casa">Casa</option>
      <option value="trabalho">Trabalho</option>
      <option value="celular">Celular</option>
  </select>
  <input name="numero-1" type="phone" />
  <select name="tipo-telefone-2">
      <option value="casa">Casa</option>
      <option value="trabalho">Trabalho</option>
      <option value="celular">Celular</option>
  </select>
  <input name="numero-2" type="phone" />
  <select name="tipo-telefone-3">
      <option value="casa">Casa</option>
      <option value="trabalho">Trabalho</option>
      <option value="celular">Celular</option>
  </select>
  <input name="numero-3" type="phone" />
</fieldset>
<button id ="cadastrar" type="submit">Cadastrar</button>
<a href="/#contacts">Voltar para lista de contatos</a>
  `
    eventos()
    return addContact
}

function validationMessage(retorno, status) {
    const mensagem = retorno
    const alerta = document.createElement('div')
    alerta.textContent = mensagem
    alerta.classList.add('alerta')
    //se for true ele vai setar um fundo verde de sucesso
    if(status){
        alerta.style.backgroundColor = 'green'
        alerta.style.color = '#ffffff'
    }
    addContact.appendChild(alerta)

    setTimeout(() => {
        alerta.remove()
    }, 5000)
}