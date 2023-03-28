const notFound = document.createElement("div")
notFound.setAttribute("id", "p-not-found")

export function NotFound() {
  notFound.innerHTML = `
  <div id="p-not-found">
  <img src="https://cdn-icons-png.flaticon.com/512/943/943692.png" alt="Página não encontrada">
  <h1 class="not-found-title">Página não encontrada :(</h1>
  <a href="#login">Voltar ao início.</a>
</div>
  `
  window.location.hash = "#404"
  return notFound
}