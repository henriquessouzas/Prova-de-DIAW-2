import  listarNaRoca from '../services/votacaoService';
import registrarVoto from '../services/votacaoService';
import { listarForaDaRoca } from '../services/votacaoService';

const [ultimoVoto, setUltimoVoto] = useState(null);
const [votosNaSessao, setVotosNaSessao] = useState(0);

function handleVotar(participante) {
    registrarVoto (participante.id);
    setUltimoVoto(participante);
    setVotosNaSessao(votosNaSessao + 1);

    {naRoca.map((p) => (
        <ParticipanteCard 
        key={p.id} 
        participante={p} 
        onVotar={handleVotar} 
        />
    ))}
}

