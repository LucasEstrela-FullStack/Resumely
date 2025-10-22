# Resumely AI

Gerador de currículos e cartas de apresentação com suporte a autenticação (Kinde) e geração via API OpenAI.

Projeto em Next.js (app router) que usa Prisma para persistência em PostgreSQL. Usuários fazem login via Kinde, completam seu perfil e podem gerar documentos (currículos e cartas) usando a API da OpenAI.

## Sumário

- Visão geral
- Tecnologias principais
- Instalação e execução local
- Variáveis de ambiente necessárias
- Scripts disponíveis
- Endpoints principais da API
- Prisma e migrações
- Deploy
- Contribuição
- Próximos passos e melhorias

## Visão geral

O Resumely é uma aplicação que permite ao usuário criar currículos (resumes) e cartas de apresentação (cover letters) com ajuda de IA. O fluxo principal:

1. Usuário autentica via Kinde.
2. Usuário preenche/atualiza seu perfil (dados pessoais, experiência, educação, skills).
3. Usuário envia uma vaga (título, empresa, descrição) para gerar um documento.
4. O backend consulta o perfil do usuário, envia prompts para a API da OpenAI e grava o documento no banco de dados.

## Tecnologias principais

- Next.js 15 (App Router)
- React 19
- Prisma (client + migrations)
- PostgreSQL
- Kinde (autenticação) — pacote `@kinde-oss/kinde-auth-nextjs`
- OpenAI (chamada direta à API de chat)
- Tailwind CSS

## Pré-requisitos

- Node.js (recomendo >= 20)
- npm, pnpm ou yarn
- Um banco PostgreSQL acessível
- Conta/integração Kinde configurada
- Chave da OpenAI (API Key)

## Instalação

1. Clone o repositório:

```bash
git clone <REPO_URL>
cd resumely
```

2. Instale dependências:

```bash
npm install
# ou pnpm install
# ou yarn
```

3. Configure as variáveis de ambiente (veja seção abaixo).

# 📝 Resumely AI

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org) [![Node.js](https://img.shields.io/badge/Node->=20-brightgreen?logo=node.js&logoColor=white)](https://nodejs.org) [![Prisma](https://img.shields.io/badge/Prisma-ORM-2F74C0?logo=prisma&logoColor=white)](https://www.prisma.io) [![OpenAI](https://img.shields.io/badge/OpenAI-API-black?logo=openai&logoColor=white)](https://openai.com)

Gerador de currículos e cartas de apresentação com suporte a autenticação (Kinde) e geração via API OpenAI.

Projeto em Next.js (App Router) que usa Prisma para persistência em PostgreSQL. Usuários fazem login via Kinde, completam seu perfil e podem gerar documentos (currículos e cartas) usando a API da OpenAI.

## Sumário 📚

- Visão geral ✨
- Tecnologias principais 🧰
- Instalação e execução local ⚙️
- Variáveis de ambiente necessárias 🔑
- Scripts disponíveis ▶️
- Endpoints principais da API 🔌
- Prisma e migrações 🗄️
- Deploy 🚀
- Contribuição 🤝
- Próximos passos e melhorias 📈

## Visão geral ✨

O Resumely é uma aplicação que permite ao usuário criar currículos (resumes) e cartas de apresentação (cover letters) com ajuda de IA. O fluxo principal:

1. Usuário autentica via Kinde. 🔐
2. Usuário preenche/atualiza seu perfil (dados pessoais, experiência, educação, skills). 🧾
3. Usuário envia uma vaga (título, empresa, descrição) para gerar um documento. 💼
4. O backend consulta o perfil do usuário, envia prompts para a API da OpenAI e grava o documento no banco de dados. 🤖 ➜ 💾

## Tecnologias principais 🧰

- Next.js 15 (App Router) ⚡
- React 19 ⚛️
- Prisma (client + migrations) 🗄️
- PostgreSQL 🐘
- Kinde (autenticação) — pacote `@kinde-oss/kinde-auth-nextjs` 🔒
- OpenAI (chamada direta à API de chat) 🤖
- Tailwind CSS 🎨

## Pré-requisitos ✅

- Node.js (recomendo >= 20) 🟢
- npm, pnpm ou yarn 📦
- Um banco PostgreSQL acessível 🐘
- Conta/integração Kinde configurada 🔑
- Chave da OpenAI (API Key) 🧾

## Instalação ⚙️

1. Clone o repositório:

```bash
git clone <REPO_URL>
cd resumely
```

2. Instale dependências:

```bash
npm install
# ou pnpm install
# ou yarn
```

3. Configure as variáveis de ambiente (veja seção abaixo).

4. Rode as migrações do Prisma (ambiente de desenvolvimento):

```bash
npx prisma migrate dev --name init
```

5. Inicie em modo de desenvolvimento:

```bash
npm run dev
```

Abra http://localhost:3000

## Variáveis de ambiente 🔑

Defina as variáveis abaixo em um arquivo `.env` na raiz do projeto.

- `DATABASE_URL` — string de conexão PostgreSQL (ex: `postgres://USER:PASS@HOST:PORT/DB`) 🐘
- `DIRECT_URL` — (opcional) URL direta para o banco, usada pelo Prisma 🔗
- `OPENAI_KEY` — chave da API OpenAI utilizada para gerar documentos 🤖

Observações sobre Kinde: o projeto usa o pacote oficial `@kinde-oss/kinde-auth-nextjs`. A configuração do Kinde normalmente exige variáveis específicas (client id/secret, domain) que são gerenciadas internamente pela integração — verifique o painel Kinde para instruções de configuração e redirecionamento. Os arquivos do middleware e rotas de autenticação estão prontos para usar o fluxo do Kinde.

## Scripts ▶️

Os scripts disponíveis em `package.json`:

- `dev` — inicia o servidor Next.js em modo desenvolvimento (`next dev`) 🧭
- `build` — gera build de produção (`next build`) 🏗️
- `start` — inicia o servidor de produção (`next start`) ▶️
- `lint` — executa ESLint 🧹

Exemplo:

```bash
npm run dev
npm run build
npm start
```

## Endpoints principais (API) 🔌

As rotas estão no `app/api` seguindo o App Router do Next.js.

- `GET /api/profile` — retorna o perfil do usuário autenticado. Retorna `{ ok: true, user }`. 👤
- `PUT /api/profile` — atualiza ou cria o perfil do usuário. Aceita JSON com campos como `firstName`, `lastName`, `email`, `address`, `city`, `zipcode`, `phone`, `linkedIn`, `portfolio`, `summary`, `skills`, `experience`, `education`, `achievements`. ✍️

- `GET /api/documents` — lista documentos (currículos/cartas) do usuário autenticado. 📄
- `POST /api/generate` — gera um documento a partir do perfil do usuário e da descrição da vaga. Payload esperado (JSON):

```json
{
  "jobTitle": "Título da vaga",
  "company": "Nome da empresa",
  "description": "Descrição da vaga",
  "type": "resume" | "cover_letter"
}
```

Resposta (sucesso): `{ ok: true, document }` onde `document` é o registro salvo no banco. ✅

- `GET /api/documents/:id` — obtém um documento específico (apenas se pertencer ao usuário). 🔍
- `DELETE /api/documents/:id` — remove o documento (apenas se pertencer ao usuário). 🗑️

Autenticação: todas as rotas acima verificam sessão via Kinde usando `getKindeServerSession()`; chamadas sem sessão retornam 401. 🔐

## Prisma 🗄️

O projeto inclui o schema Prisma em `prisma/schema.prisma`. Use os comandos do Prisma para gerenciar o banco:

- Gerar client: `npx prisma generate` (normalmente rodado automaticamente após migrate dev) ⚙️
- Criar/rodar migração: `npx prisma migrate dev --name <nome>` 🛠️
- Ver o diagrama/SSG: `npx prisma studio` para inspecionar dados localmente 👀

O `generator` no schema já aponta para `src/generated/prisma`.

## OpenAI 🤖

O endpoint `POST /api/generate` usa a variável `OPENAI_KEY` para chamar a API de chat do OpenAI. Verifique seu plano e limites antes de rodar.

Nota: no código atual a chamada utiliza `model: "gpt-5-nano"` — ajuste conforme sua conta/permissões. Se quiser usar outro modelo (por exemplo gpt-4o), edite a rota em `src/app/api/generate/route.js`.

## Deploy 🚀

Recomenda-se deploy em plataformas compatíveis com Next.js (Vercel, Render, Railway, Fly.io). Passos gerais:

1. Configure variáveis de ambiente no painel da plataforma (DATABASE_URL, OPENAI_KEY, variáveis do Kinde). 🔧
2. Rode build (na plataforma geralmente automática) e inicie a aplicação. ▶️

Observação: se usar Vercel, verifique as configurações do adaptador e do Kinde (redirect URIs). 🔁

## Contribuição 🤝

Contribuições são bem-vindas. Siga estes passos:

1. Fork o repositório 🍴
2. Crie uma branch: `git checkout -b feat/minha-feature` 🌿
3. Faça commits pequenos e claros ✨
4. Abra um Pull Request descrevendo a mudança 📬
