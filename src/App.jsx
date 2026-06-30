// Estados controlados pela interface.
const [busca, setBusca] = useState('')
const [categoriaAtiva, setCategoriaAtiva] = useState('Todas')
const [statusAtivo, setStatusAtivo] = useState('Todos')
const [favoritos, setFavoritos] = useState(() => {
 const favoritosSalvos = localStorage.getItem('biblioteca-viv :favoritos')
 return favoritosSalvos ? JSON.parse(favoritosSalvos) : []
})
useEffect(() => {
 localStorage.setItem('biblioteca-viva:favoritos', JSON.stringify(favoritos))
}, [favoritos])

const categorias = useMemo(() => {
 const categoriasUnicas = livrosBase.map((livro) => livro.categoria)
 return [...new Set(categoriasUnicas)].sort()
}, [])

const categorias = useMemo(() => {
 const categoriasUnicas = livrosBase.map((livro) => livro.categoria)
 return [...new Set(categoriasUnicas)].sort()
 }, [])

 const livrosFiltrados = useMemo(() => {
 const termo = busca.trim().toLowerCase()
 return livrosBase.filter((livro) => {
 const textoPesquisavel = [
 livro.titulo,
 livro.autor,
 livro.categoria,
 ...livro.tags,
 ].join(' ').toLowerCase()
 const combinaComBusca = textoPesquisavel.includes(termo)
 const combinaComCategoria = categoriaAtiva === 'Todas' || livro.categoria === categoriaAtiva
 const combinaComStatus = statusAtivo === 'Todos' || livro.status === statusAtivo
 return combinaComBusca && combinaComCategoria && combinaComStatus
 })
}, [busca, categoriaAtiva, statusAtivo])

function alternarFavorito(idLivro
 ) {
 setFavoritos((favoritosAtuais) 
 => {
 if (favoritosAtuais.includes(
 idLivro)) {
 return favoritosAtuais.filter((id) => id !== idLivro
 )
 }
 return [...favoritosAtuais, idLivro]
 })
}

return (
 <>
 <Header />
 <main className="pagina" id="catalogo">
 <section className="hero">...</section>
 <PainelEstatisticas
 total={livrosBase.length}
 exibidos={livrosFiltrados.length}
 favoritos={favoritos.length}
 categorias={categorias.length}
 />
 <section className="filtros" id="filtros">
 <CampoBusca valor={busca} aoAlterar={setBusca} />
 <FiltroCategoria categorias={categorias} valor={categoriaAtiva} aoAlterar={setCategoriaAtiva} />
 <FiltroStatus valor={statusAtivo} aoAlterar={setStatusAtivo} />
 </section>
 <ListaLivros livros={livrosFiltrados} favoritos={favoritos} aoAlternarFavorito={alternarFavorito} />
 </main>
 <Footer />
 </>
)
