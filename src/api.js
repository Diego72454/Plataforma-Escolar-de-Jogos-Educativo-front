export async function login(matricula, senha) {
  const resp = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ matricula, senha }),
  });

  let dados = null;
  try {
    dados = await resp.json();
  } catch {
    
  }

  if (!resp.ok) {
    throw new Error(dados?.mensagem || "Não foi possível entrar. Tente novamente.");
  }
  return dados; // { matricula, nome, turma, faixaEtaria }
}
