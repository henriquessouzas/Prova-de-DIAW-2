import { useState } from 'react';
import { Link } from 'react-router-dom';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';
import ParticipanteCard from '../components/ParticipanteCard';

function Votacao() {
  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votosNaSessao, setVotosNaSessao] = useState(0);

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setVotosNaSessao((prev) => prev + 1);
  }

  return (
    <main className="votacao">
      <h2 className="votacao-titulo">Quem deve sair da roça?</h2>

      <section className="votacao-roca">
        <h3>Na roça</h3>
        <div className="grade-roca">
          {naRoca.map((p) => (
            <ParticipanteCard key={p.id} participante={p} onVotar={handleVotar} />
          ))}
        </div>
      </section>

      {ultimoVoto !== null && (
        <div className="votacao-confirmacao">
          <p>
            Você votou em <strong>{ultimoVoto.nome}</strong>{' '}
            {votosNaSessao === 1 ? '1 vez' : `${votosNaSessao} vezes`}.
          </p>
          <Link to="/resultado" className="botao botao-secundario">
            Ver resultado parcial
          </Link>
        </div>
      )}

      <section className="votacao-elenco">
        <h3>Demais peões</h3>
        <div className="grade-elenco">
          {foraDaRoca.map((p) => (
            <ParticipanteCard key={p.id} participante={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
