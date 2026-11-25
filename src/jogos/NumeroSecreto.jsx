import { useState } from "react";


const NIVEIS = {
  facil: { nome: "Fácil", min: 1, max: 20, penalidade: 100 },
  medio: { nome: "Médio", min: 1, max: 100, penalidade: 60 },
  dificil: { nome: "Difícil", min: 1, max: 500, penalidade: 40 },
};

const sortear = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function NumeroSecreto({ onVoltar }) {
  const [chave, setChave] = useState(null);
  const [secreto, setSecreto] = useState(0);
  const [palpite, setPalpite] = useState("");
  const [historico, setHistorico] = useState([]); 
  const [aviso, setAviso] = useState("");
  const [pontos, setPontos] = useState(null);

  const nivel = chave ? NIVEIS[chave] : null;

  function iniciar(k) {
    setChave(k);
    setSecreto(sortear(NIVEIS[k].min, NIVEIS[k].max));
    setPalpite("");
    setHistorico([]);
    setAviso("");
    setPontos(null);
  }

  function chutar(e) {
    e.preventDefault();
    const texto = palpite.trim();
    const valor = Number(texto);

    
    if (texto === "" || !Number.isInteger(valor)) {
      setAviso("Digite um número inteiro para jogar.");
      return;
    }
    if (valor < nivel.min || valor > nivel.max) {
      setAviso(`Escolha um número entre ${nivel.min} e ${nivel.max}.`);
      return;
    }

    setAviso("");
    setPalpite("");

    if (valor === secreto) {
      const erros = historico.length;
      setPontos(Math.max(100, 1000 - erros * nivel.penalidade));
      setHistorico([...historico, { valor, dica: "acertou" }]);
    } else {
      setHistorico([...historico, { valor, dica: secreto > valor ? "maior" : "menor" }]);
    }
  }

 
  if (!chave) {
    return (
      <section>
        <h2>🔢 Caça ao Número Secreto</h2>
        <p>Escolha a dificuldade:</p>
        <div className="niveis">
          {Object.entries(NIVEIS).map(([k, n]) => (
            <button key={k} onClick={() => iniciar(k)}>
              {n.nome} <small>({n.min} a {n.max})</small>
            </button>
          ))}
        </div>
        <button className="link" onClick={onVoltar}>← Voltar ao catálogo</button>
      </section>
    );
  }


  return (
    <section>
      <h2>🔢 Caça ao Número Secreto — {nivel.nome}</h2>
      <p>Estou pensando em um número de {nivel.min} a {nivel.max}.</p>

      {pontos === null ? (
        <form onSubmit={chutar} className="chute">
          <input
            value={palpite}
            onChange={(e) => setPalpite(e.target.value)}
            inputMode="numeric"
            placeholder="Seu palpite"
            autoFocus
          />
          <button type="submit">Chutar</button>
        </form>
      ) : (
        <div className="vitoria">
          🎉 Acertou em {historico.length} tentativa(s)!
          <strong>Pontuação: {pontos}</strong>
          <button onClick={() => iniciar(chave)}>Jogar de novo</button>
        </div>
      )}

      {aviso && <p className="erro" role="alert">{aviso}</p>}

      {historico.length > 0 && (
        <ul className="historico">
          {historico.map((h, i) => (
            <li key={i}>
              {h.valor} →{" "}
              {h.dica === "acertou" ? "✅ Acertou!" : `o número secreto é ${h.dica.toUpperCase()}`}
            </li>
          ))}
        </ul>
      )}

      <button className="link" onClick={() => setChave(null)}>← Trocar dificuldade</button>
    </section>
  );
}