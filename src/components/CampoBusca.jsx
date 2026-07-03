function CampoBusca({ valor, aoAlterar }) {
// Atencao: buscas em listas muito grandes podem exigir debounce para evitar re-render excessivo.
// Interessante: componente controlado (value + onChange) deixa o estado centralizado no App.
return (
<label className="campo-busca">
<span>Buscar por título, autor, categoria ou tag</span>
<input
type="search"
value={valor}
onChange={(evento) => aoAlterar(evento.target.value)}
placeholder="Exemplo: ciência, Machado, tecnologia"
/>
</label>
)
}
export default CampoBusca
