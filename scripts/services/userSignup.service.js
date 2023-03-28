const urlBase = "http://localhost:5000/v1/"

const headers = new Headers()
headers.append('content-type', 'application/json')

export const signupService = async (dados) => {
    //concatenação da base com o endpoint
    const url = urlBase + 'user'
    //requisição usando fetch e o body convertento meu json para string, porque é dessa forma
    const resposta = await fetch(url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(dados)
    })
    //retorno quando ele mandar a resposta
    return await resposta.json()
}