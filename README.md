# Backend

Este é o backend de uma aplicação Node.js utilizando Express e MongoDB. Ele oferece suporte à autenticação com JWT e inclui funcionalidades típicas de APIs RESTful.

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MongoDB (via driver oficial)**
- **JWT (jsonwebtoken)**
- **bcrypt** para hashing de senhas
- **dotenv** para variáveis de ambiente
- **CORS** para permitir requisições de diferentes origens

## 📁 Estrutura do Projeto

- `app.js` – Arquivo principal do servidor Express
- `.env` – Variáveis de ambiente (como URI do MongoDB e chave JWT)
- `package.json` – Dependências e scripts do projeto

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio/back
```

### 2. Instale as dependências

Utilize o seguinte comando para instalar os pacotes necessários:

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```env
MONGODB_URI=sua_uri_mongodb
JWT_SECRET=sua_chave_secreta
```

Essas variáveis são usadas para conectar ao banco de dados MongoDB e gerar tokens de autenticação.

### 4. Inicie o servidor

Execute o seguinte comando para rodar o backend localmente:

```bash
node app.js
```

Por padrão, o servidor estará acessível em:

```
http://localhost:3000
```

---

## 📦 Scripts

- `npm test` – Comando de teste placeholder

---

## 📄 Licença e Direitos Autorais

Este é um projeto pessoal desenvolvido por **Leonardo Franca** com fins de estudo e aprendizado.

© 2025 Leonardo Franca. Todos os direitos reservados.

O uso, cópia ou redistribuição deste código é permitido apenas com autorização prévia do autor.
