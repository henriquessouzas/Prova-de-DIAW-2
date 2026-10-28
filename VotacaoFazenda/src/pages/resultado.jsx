import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularTotalVotos,
  calcularResultado,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Tem certeza que deseja zerar os votos?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="resultado">
      <h2 className="resultado-titulo">Resultado da Votação</h2>

      {total === 0 ? (
        <div className="resultado-vazio">
          <p>Nenhum voto registrado ainda.</p>
          <Link to="/votacao" className="botao botao-principal">
            Votar agora
          </Link>
        </div>
      ) : (
        <>
          <p className="resultado-total">Total de votos: <strong>{total}</strong></p>

          <ul className="placar">
            {resultado.map((p, index) => (
              <li key={p.id} className={`placar-item ${index === 0 ? 'placar-lider' : ''}`}>
                <div className="placar-info">
                  <img src={p.foto} alt={p.nome} className="placar-foto" />
                  <span className="placar-nome">{p.nome}</span>
                  {index === 0 && <span className="selo-sairia">Sairia hoje</span>}
                </div>
                <div className="barra">
                  <div
                    className="barra-preenchida"
                    style={{ width: `${p.percentual}%` }}
                  />
                </div>
                <span className="placar-dados">
                  {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% &mdash; {p.votos}{' '}
                  {p.votos === 1 ? 'voto' : 'votos'}
                </span>
              </li>
            ))}
          </ul>

          <button className="botao botao-secundario resultado-zerar" onClick={handleZerar}>
            Zerar votação
          </button>
        </>
      )}
    </main>
  );
}

export default Resultado;
