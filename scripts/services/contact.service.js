const urlBase = "http://localhost:5000/v1/"

export const GetAllContactsService = async (dados) => {
    const url = urlBase + 'contact'

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', sessionStorage.getItem('@token'))

    const resposta = await fetch(url, {
        headers: headers,
        body: JSON.stringify(dados),
        method: 'GET'
    })
    return await resposta.json()
}

export const GetContactService = async (id) => {
    const url = urlBase + `contact/${id}`

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', sessionStorage.getItem('@token'))

    const resposta = await fetch(url, {
        headers: headers,
        method: 'GET'
    })

    return await resposta.json()
}

//só funciona dessa forma ?!
export const DeleteContactService = async (idContato) => {
    const url = urlBase + `contact`
    
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', sessionStorage.getItem('@token'))

    const resposta = await fetch(url, {
        headers: headers,
        method: 'DELETE',
        body: JSON.stringify({ idContato })
    })

    return await resposta.json()
}

export const AddContactService = async (dados) => {
    const url = urlBase + `contact`
    
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', sessionStorage.getItem('@token'))

    const resposta = await fetch(url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(dados)
    })

    return await resposta.json()
}