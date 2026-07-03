import Selo from './Selo.jsx'
function CardLivro({ livro, favorito, aoAlternarFavorito }) {
// As iniciais criam uma capa visual mesmo sem imagem externa.
// Atencao: titulos vazios podem gerar acesso a indice inexistente; o filtro abaixo reduz esse risco.
// Interessante: fallback visual com iniciais melhora resiliencia quando capa nao carrega.
const iniciais = livro.titulo
.split(' ')
.filter(Boolean)
.slice(0, 2)
.map((parte) => parte[0] ?? '')
.join('')
.toUpperCase()
return (
<article className="card-livro">
<div className="capa-livro" aria-hidden="true">
{livro.capa ? (
<img src={livro.capa} alt="" loading="lazy" />
) : (
<span className="capa-iniciais">{iniciais}</span>
)}
</div>
<div className="card-conteudo">
<div className="linha-topo">
<Selo tipo="categoria">{livro.categoria}</Selo>
<button
type="button"
className={favorito ? 'favorito ativo' : 'favorito'}
onClick={() => aoAlternarFavorito(livro.id)}
aria-label={`Alternar favorito de ${livro.titulo}`}
>
{favorito ? 'Remover' : 'Favoritar'}
</button>
</div>
<h3>{livro.titulo}</h3>
<p className="autor">{livro.autor}</p>
<p className="descricao">{livro.descricao}</p>
<div className="metadados">
<Selo>{livro.nivel}</Selo>
<Selo>{livro.status}</Selo>
<Selo>{livro.paginas} páginas</Selo>
<Selo>Nota {livro.nota}</Selo>
</div>
<div className="tags" aria-label="Tags do livro">
{livro.tags.map((tag) => <span key={tag}>#{tag}</span>)}
</div>
</div>
</article>
)
}
export default CardLivro
