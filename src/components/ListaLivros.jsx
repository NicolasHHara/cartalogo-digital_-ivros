import CardLivro from './CardLivro.jsx'
import EmptyState from './EmptyState.jsx'
function ListaLivros({ livros, favoritos, aoAlternarFavorito }) {
 // Se a busca ou filtro não encontrar nada, mostramos orientação.
 if (livros.length === 0) return <EmptyState />
 return (
 <section className="lista-livros" aria-label="Lista de livros filtr
 ados">
 {livros.map((livro) => (
 <CardLivro
 key={livro.id}
 livro={livro}
 favorito={favoritos.includes(livro.id)}
 aoAlternarFavorito={aoAlternarFavorito}
 />
 ))}
 </section>
 )
}
export default ListaLivros
