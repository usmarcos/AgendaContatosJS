const urlBase = "http://localhost:5000/v1/"

const headers = new Headers()

export const GetAllContactsService = async (dados) => {
    const url = urlBase + 'contact'

    headers.append('Authorization', sessionStorage.getItem('@token'))

    const resposta = await fetch(url, {
        headers: headers,
        body: JSON.stringify(dados),
        method: 'GET'
    })

    /**
    * Por conta de um erro do back, quando eu relogo apresenta erro de não autorizado
    * Faço a página recarregar e chamo novamente
    */
    if (resposta.status === 401) {
        setTimeout(() => {
            location.reload()
            GetAllContactsService()
        }, 10)
    }

    return await resposta.json()
}

export const GetContactService = async (id) => {
    const url = urlBase + `contact/${id}`

    headers.append('Authorization', sessionStorage.getItem('@token'))

    const resposta = await fetch(url, {
        headers: headers,
        method: 'GET'
    })

    return await resposta.json()
}