function ParticipanteCard({ participante, onVotar }) {
  const { nome, foto, naRoca } = participante;

  return (
    <article className={naRoca ? 'card card-roca' : 'card'}>
      {naRoca && <span className="selo-roca">Na Roça</span>}
      <img src={foto} alt={nome} className="card-foto" />
      <p className="card-nome">{nome}</p>
      {onVotar && (
        <button className="botao botao-principal card-votar" onClick={() => onVotar(participante)}>
          Votar para eliminar
        </button>
      )}
    </article>
  );
}

export default ParticipanteCard;
