const cardContact = document.createElement('div')
//toda lista vai ter um novo card de contato. Adiciono a ele
cardContact.classList.add('c-card-contact')

export const CardContact = (contato) => {

    //dessa forma na rota terá o id do contato para ser passado na url
    cardContact.innerHTML = `
        <p>${contato.nome}</p>
        <a href='?id-contact=${contato.id}#contact-details'> Visualizar </a>
        `
    //retorna um clone da div criada acima
    return cardContact.cloneNode(true) //true seria um clona esse elemento todo, com os itens dentro
}