function Selo({ children, tipo = 'neutro' }) {
// Atencao: tipo invalido gera classe sem estilo esperado; prefira validar em nivel de chamada.
// Interessante: componente pequeno e composicional evita repeticao de markup nos cards.
return <span className={`selo ${tipo}`}>{children}</span>
}
export default Selo
