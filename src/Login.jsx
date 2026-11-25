import { useState } from "react";
import { login } from "./api.js";


export default function Login({ onEntrar }) {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar(e) {
    e.preventDefault();
    setErro("");

    if (!matricula.trim() || !senha) {
      setErro("Preencha a matrícula e a senha.");
      return;
    }

    setCarregando(true);
    try {
      onEntrar(await login(matricula.trim(), senha));
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="card">
      <h1>🎮 Jogos Educativos</h1>
      <p className="sub">Entre com a sua matrícula</p>

      <form onSubmit={enviar}>
        <label>
          Matrícula
          <input
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            autoComplete="username"
            inputMode="numeric"
          />
        </label>

        <label>
          Senha ou PIN
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        {erro && <p className="erro" role="alert">{erro}</p>}

        <button type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
