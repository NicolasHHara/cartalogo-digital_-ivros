import { useEffect, useMemo, useState } from 'react'
import livrosBase from './data/livros.json'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CampoBusca from './components/CampoBusca.jsx'
import FiltroCategoria from './components/FiltroCategoria.jsx'
import FiltroStatus from './components/FiltroStatus.jsx'
import PainelEstatisticas from './components/PainelEstatistica.jsx'
import ListaLivros from './components/ListaLivros.jsx'
import './App.css'
function lerFavoritosSeguros() {
  // Atencao: JSON invalido no localStorage pode quebrar o app no primeiro render.
  // Interessante: encapsular o parse em funcao separada melhora testabilidade e reuso.
  try {
  const favoritosSalvos = localStorage.getItem('biblioteca-viva:favoritos')
  const favoritosConvertidos = favoritosSalvos ? JSON.parse(favoritosSalvos) : []
  return Array.isArray(favoritosConvertidos) ? favoritosConvertidos : []
  } catch {
  return []
  }
  }
  function App() {
  // Estados controlados pela interface.
  const [busca, setBusca] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas')
  const [statusAtivo, setStatusAtivo] = useState('Todos')
  // Estado inicial com leitura do localStorage.
  const [favoritos, setFavoritos] = useState(() => {
  return lerFavoritosSeguros()
  })
  // Sempre que favoritos mudar, a nova lista é salva no navegador.
  useEffect(() => {
  localStorage.setItem('biblioteca-viva:favoritos', JSON.stringify(favoritos))
  }, [favoritos])
  // Categorias derivadas da base JSON, sem duplicidade.
  const categorias = useMemo(() => {
  const categoriasUnicas = livrosBase.map((livro) => livro.categoria)
  return [...new Set(categoriasUnicas)].sort()
  }, [])
  // Lista filtrada a partir de busca, categoria e status.
  // Atencao: se as strings de status no JSON mudarem, o filtro pode deixar de encontrar resultados.
  // Interessante: useMemo evita recalculo caro quando os estados de filtro nao mudam.
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
  function alternarFavorito(idLivro) {
  // Atencao: comparar por id pressupoe unicidade; ids duplicados causariam comportamento inconsistente.
  // Interessante: update funcional do estado evita bugs de concorrencia em cliques rapidos.
  setFavoritos((favoritosAtuais) => {
  if (favoritosAtuais.includes(idLivro)) {
  return favoritosAtuais.filter((id) => id !== idLivro)
  }
  return [...favoritosAtuais, idLivro]
})
}
return (
<>
<Header />
<main className="pagina" id="catalogo">
<section className="hero">
<div>
  <span className="etiqueta">Projeto React guiado por dados</span>
   <h1>Catálogo digital para organizar leituras e recomendações</h1>
    <p>
Uma interface construída com componentes reutilizáveis, filtros dinâmicos,cards responsivos e dados estruturados em JSON.
    </p>
</div>
</section>
<PainelEstatisticas
total={livrosBase.length}
exibidos={livrosFiltrados.length}
favoritos={favoritos.length}
categorias={categorias.length}
/>
<section className="filtros" id="filtros">
<CampoBusca valor={busca} aoAlterar={setBusca} />
<FiltroCategoria
categorias={categorias}
valor={categoriaAtiva}
aoAlterar={setCategoriaAtiva}
/>
<FiltroStatus valor={statusAtivo} aoAlterar={setStatusAtivo} />
</section>
<ListaLivros
livros={livrosFiltrados}
favoritos={favoritos}
aoAlternarFavorito={alternarFavorito}
/>
</main>
<Footer />
</>
)
}
export default App  