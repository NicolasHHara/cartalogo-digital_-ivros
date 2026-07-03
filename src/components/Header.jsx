function Header() {
// Atencao: links com hash dependem de IDs existentes na pagina; IDs ausentes quebram navegacao.
// Interessante: este componente e puramente visual (sem estado), ideal para reutilizacao.
return (
<header className="header">
<a className="marca" href="#catalogo" aria-label="Ir para o catálogo">
<span className="marca-simbolo">BV</span>
<span>
<strong>Biblioteca Viva</strong>
<small>catálogo digital de leituras</small>
</span>
</a>
<nav className="nav" aria-label="Navegação principal">
<a href="#catalogo">Catálogo</a>
<a href="#filtros">Filtros</a>
<a href="#sobre">Sobre</a>
</nav>
</header>
)
}
export default Header
