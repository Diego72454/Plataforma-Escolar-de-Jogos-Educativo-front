import { useState } from "react";
import { CATALOGO } from "./jogos/catalogo.js";

export default function Home({ aluno, onSair }) {
  const [jogoAberto, setJogoAberto] = useState(null);

  // Mostra só os jogos compatíveis com a turma do aluno ("4º Ano" -> 4)
  const ano = parseInt(aluno.turma, 10);
  const jogos = CATALOGO.filter((j) => ano >= j.anoMin && ano <= j.anoMax);

  if (jogoAberto) {
    const { Componente } = jogoAberto;
    return (
      <main className="card larga">
        <Componente onVoltar={() => setJogoAberto(null)} />
      </main>
    );
  }

  return (
    <main className="card larga">
      <h1>Olá, {aluno.nome}! 👋</h1>
      <p className="sub">
        Turma: <strong>{aluno.turma}</strong> · Faixa etária: <strong>{aluno.faixaEtaria}</strong>
      </p>

      <h2>Jogos da sua turma</h2>
      {jogos.length === 0 && <p>Ainda não há jogos para a sua turma.</p>}

      <div className="jogos">
        {jogos.map((j) => (
          <article key={j.id} className="jogo">
            <div className="capa">{j.capa}</div>
            <h3>{j.titulo}</h3>
            <p>{j.descricao}</p>
            <p className="meta">{j.faixa}</p>
            <p className="meta">Níveis: {j.niveis.join(", ")}</p>
            <button onClick={() => setJogoAberto(j)}>Jogar</button>
          </article>
        ))}
      </div>

      <button className="link" onClick={onSair}>Sair</button>
    </main>
  );
}