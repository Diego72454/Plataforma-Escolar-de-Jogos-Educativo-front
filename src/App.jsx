import { useState } from "react";
import Login from "./Login.jsx";
import Home from "./Home.jsx";

const CHAVE = "aluno";

export default function App() {
  const [aluno, setAluno] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(CHAVE));
    } catch {
      return null;
    }
  });

  function entrar(dados) {
    sessionStorage.setItem(CHAVE, JSON.stringify(dados));
    setAluno(dados);
  }

  function sair() {
    sessionStorage.removeItem(CHAVE);
    setAluno(null);
  }

  return aluno ? <Home aluno={aluno} onSair={sair} /> : <Login onEntrar={entrar} />;
}
