import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Este arquivo e o ponto de entrada da aplicacao.
// Ele conecta o componente principal App a div root que existe no index.html.
// Atencao: em React.StrictMode, efeitos podem executar duas vezes no ambiente de desenvolvimento.
// Interessante: manter o bootstrap minimo aqui facilita testes e migracoes de framework no futuro.
ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<App />
</React.StrictMode>,
)