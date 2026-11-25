# Plataforma Escolar de Jogos Educativos — HU01 (Acesso Seguro do Aluno)

Login interno do aluno com matrícula + senha/PIN. Stack: Spring Boot 3 (Java 17) + React (Vite).

## Como rodar

**Back-end** (porta 8080)
```bash
cd backend
mvn spring-boot:run
```

**Front-end** (porta 5173)
```bash
cd frontend
npm install
npm run dev
```
Abra http://localhost:5173

## Alunos de teste
| Matrícula | Senha | Turma |
|-----------|-------|-------|
| 2024001 | 1234 | 1º Ano |
| 2024002 | 5678 | 4º Ano |
| 2024003 | 4321 | 7º Ano |

## Testes
```bash
cd backend
mvn test
```

## Critérios de aceitação (HU01)
1. Login só por autenticação interna (matrícula + senha/PIN, com hash BCrypt)
2. Tela sem login social e sem links externos
3. Após o login, a turma e a faixa etária do aluno são retornadas
4. Credenciais inválidas → mensagem clara, sem detalhes técnicos
# Plataforma-Escolar-de-Jogos-Educativo-front
# Plataforma-Escolar-de-Jogos-Educativo-front
