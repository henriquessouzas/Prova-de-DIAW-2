import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Votacao from './pages/Votacao'
import Resultado from './pages/resultado'
import { calcularResultado, calcularTotalVotos, obterVotos, zerarVotos } from './services/votacaoService'


function App() {
  const [votos, setVotos] = useState(() => 
    obterVotos());
  const total = calcularTotalVotos(votos);
  const resultado =calcularResultado(votos);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/votacao" element={<Votacao />} />
          <Route path="/resultado" element={<Resultado />} />
        </Routes>
      </BrowserRouter>

      <div className='barra'>
        <div className='barra-preenchida' style = {{width: `${p.percentual}%`}}/>
        {p.percentual.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 1})}
        if (p.percentual ===  0) {
          <span className='barra-votos'>0 votos</span>
        } else {
          <span className='barra-votos'>{p.votos} votos</span>
        }
      </div>
      <div className='resultado'>
        <h2>Resultado da votação</h2>
        <p>Total de votos: {total}</p>
        <ul>
          {resultado.map((p) => (
            <li key={p.id}>
              {p.nome}: {p.percentual.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 1})} ({p.votos} votos)
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function handleZerarVotos() {
  if (window.confirm('Tem certeza que deseja zerar os votos?')) {
    zerarVotos();
    setVotos({});
  }
}

export default App
