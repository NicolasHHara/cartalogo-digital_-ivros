function EmptyState() {
// Atencao: mensagens vazias sem orientacao de acao aumentam chance de abandono da busca.
// Interessante: copy objetiva aqui melhora UX ao explicar como recuperar resultados.
return (
<section className="empty-state">
<strong>Nenhum livro encontrado</strong>
<p>Altere a busca, selecione outra categoria ou escolha outro status de leitura.</p>
</section>
)
}
export default EmptyState
