function FiltroStatus({ valor, aoAlterar }) {
// Atencao: opcoes de filtro devem refletir fielmente os valores presentes no JSON de dados.
// Interessante: botoes em formato chip deixam filtros de estado mais rapidos para interacao.
const opcoes = ['Todos', 'Quero ler', 'Lendo', 'Lido', 'Por Ler']
return (
<div className="filtro-status" aria-label="Filtro por status de leitura">
{opcoes.map((opcao) => (
<button
key={opcao}
type="button"
className={valor === opcao ? 'chip ativo' : 'chip'}
onClick={() => aoAlterar(opcao)}
>
{opcao}
</button>
))}
</div>
)
}
export default FiltroStatus