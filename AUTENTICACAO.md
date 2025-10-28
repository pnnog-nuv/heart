# Sistema de Autenticação - Blue Saúde Dashboard

## Visão Geral

A aplicação agora possui um **sistema completo de autenticação** com proteção de rotas, gerenciamento de sessão via localStorage, e navegação condicional.

---

## Funcionalidades Implementadas

### ✅ 1. Autenticação Mock
- **Login funcional** com validação de credenciais
- **Token generation** único por sessão
- **User data** armazenado no localStorage
- Aceita qualquer email/senha com mais de 3 caracteres (para demonstração)

### ✅ 2. Proteção de Rotas
- **Middleware automático** verifica autenticação em todas as páginas
- Redireciona para `/login` se não autenticado
- Redireciona para `/` se já autenticado tentando acessar login
- Loading state durante verificação

### ✅ 3. Gerenciamento de Sessão
- **localStorage** para persistência de token e dados do usuário
- **AuthContext** React para estado global
- **Validação automática** ao carregar a aplicação

### ✅ 4. Interface de Usuário
- **Página de login** centralizada com formulário completo
- **Sidebar** com informações do usuário logado
- **Botão de logout** visível e funcional
- **Feedback de erro** visual em caso de falha no login

---

## Estrutura de Arquivos

```
blue-saude-dashboard/
├── lib/
│   └── auth.ts                    # Funções de autenticação
├── contexts/
│   └── AuthContext.tsx            # Context React com estado global
├── components/
│   └── layout/
│       ├── LayoutContent.tsx      # Controla renderização com/sem sidebar
│       └── Sidebar.tsx            # Sidebar com user info + logout
├── app/
│   ├── layout.tsx                 # Root layout com AuthProvider
│   └── login/
│       └── page.tsx               # Página de login
```

---

## Fluxo de Autenticação

### 1. **Acesso Inicial**
```
Usuário acessa qualquer rota
  ↓
AuthContext verifica token no localStorage
  ↓
Token existe? → Sim → Carrega user data → Permite acesso
  ↓
Token existe? → Não → Redireciona para /login
```

### 2. **Login**
```
Usuário preenche email/senha
  ↓
Clica em "Entrar no Dashboard"
  ↓
AuthContext.login() chama auth.login()
  ↓
Valida credenciais (mock: qualquer email/senha válida)
  ↓
Gera token único + user data
  ↓
Salva no localStorage (TOKEN_KEY, USER_KEY)
  ↓
Atualiza estado global (setUser)
  ↓
Redireciona para / automaticamente
```

### 3. **Navegação Autenticada**
```
Usuário navega entre páginas
  ↓
AuthContext mantém estado global
  ↓
Sidebar exibe nome + email do usuário
  ↓
Todas as rotas protegidas verificam isAuthenticated
```

### 4. **Logout**
```
Usuário clica em "Sair" na Sidebar
  ↓
AuthContext.logout()
  ↓
Remove token + user do localStorage
  ↓
Limpa estado global (setUser(null))
  ↓
Redireciona para /login
```

---

## Código-Fonte

### `lib/auth.ts`

Funções de autenticação e gerenciamento de sessão:

```typescript
// Constantes
const TOKEN_KEY = "blue-saude-auth-token";
const USER_KEY = "blue-saude-user";

// Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Funções principais
- login(email, password): Promise<AuthResponse>
- saveAuth(token, user): void
- getToken(): string | null
- getUser(): User | null
- isAuthenticated(): boolean
- logout(): void
- validateToken(): Promise<boolean>
```

### `contexts/AuthContext.tsx`

Context React para gerenciamento global:

```typescript
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email, password) => Promise<{success, error?}>;
  logout: () => void;
}

// Provider com proteção de rotas automática
export function AuthProvider({ children })

// Hook para consumir o context
export function useAuth()
```

### Uso nos Componentes

```typescript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Não autorizado</div>;
  }

  return (
    <div>
      <p>Olá, {user?.name}!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

---

## Segurança (Mock vs Produção)

### Mock (Atual)

✅ **O que está implementado:**
- Validação básica de formato (email válido, senha > 3 chars)
- Token único gerado por sessão
- Proteção de rotas no client-side
- Logout funcional
- Persistência no localStorage

⚠️ **Limitações (por ser mock):**
- Aceita **qualquer** email/senha válida
- Token não é validado por backend
- Não há expiração de token
- Não há refresh token
- Dados sensíveis no localStorage (não encriptados)

### Para Produção

🔐 **Necessário implementar:**

1. **Backend Real:**
   ```typescript
   // lib/auth.ts - Função login
   export async function login(email: string, password: string) {
     const response = await fetch('/api/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password }),
     });

     if (!response.ok) {
       return { success: false, error: 'Credenciais inválidas' };
     }

     const data = await response.json();
     return { success: true, token: data.token, user: data.user };
   }
   ```

2. **Token JWT:**
   ```typescript
   // Backend gera JWT com expiração
   const token = jwt.sign(
     { userId: user.id, email: user.email },
     process.env.JWT_SECRET,
     { expiresIn: '24h' }
   );
   ```

3. **Refresh Token:**
   ```typescript
   // Armazenar refresh token em httpOnly cookie
   // Access token de curta duração (15min)
   // Refresh token de longa duração (7 dias)
   ```

4. **Validação no Backend:**
   ```typescript
   // Middleware de autenticação
   export async function authMiddleware(req: Request) {
     const token = req.headers.get('Authorization')?.replace('Bearer ', '');

     if (!token) {
       return new Response('Unauthorized', { status: 401 });
     }

     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded;
       return next();
     } catch {
       return new Response('Invalid token', { status: 401 });
     }
   }
   ```

5. **Cookies httpOnly (mais seguro que localStorage):**
   ```typescript
   // Backend define cookie httpOnly
   res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`);
   ```

6. **Rate Limiting:**
   ```typescript
   // Limitar tentativas de login
   // Ex: máximo 5 tentativas por IP a cada 15 minutos
   ```

7. **HTTPS Obrigatório**
   - Certificado SSL/TLS em produção
   - Redirect automático HTTP → HTTPS

---

## Testando a Autenticação

### 1. Acesso Sem Login

1. Acesse qualquer rota: `http://localhost:3000/`
2. Você será **redirecionado** para `/login` automaticamente
3. Verá tela de login centralizada com formulário

### 2. Login Válido

1. Preencha qualquer email válido: `paulo@nuvtech.com`
2. Preencha senha com 3+ caracteres: `123456`
3. Clique em "Entrar no Dashboard"
4. Loading aparece por 1 segundo (simulação de API)
5. Você é **redirecionado** para `/` automaticamente
6. Sidebar aparece com seu nome + email

### 3. Login Inválido

1. Deixe email vazio ou senha < 3 caracteres
2. Clique em "Entrar"
3. **Mensagem de erro** aparece em vermelho
4. Não há redirecionamento

### 4. Navegação Autenticada

1. Após login, navegue livremente:
   - `/` - Dashboard
   - `/setor/1` - Detalhes do setor
   - `/setor/1/processo/1` - Detalhes do processo
2. Sidebar permanece visível
3. Seu nome/email aparecem no footer da sidebar

### 5. Logout

1. Clique no botão **"Sair"** (vermelho) no footer da sidebar
2. Você é **redirecionado** para `/login`
3. Token e dados são **removidos** do localStorage
4. Tentar acessar `/` sem login **redireciona** para `/login`

### 6. Persistência

1. Faça login
2. **Recarregue a página** (F5)
3. Você **permanece autenticado** (dados do localStorage)
4. **Feche e abra** o navegador
5. Você ainda está autenticado

---

## LocalStorage Keys

```javascript
// Verificar no DevTools → Application → Local Storage

"blue-saude-auth-token"
// Valor: "mock-token-1730064000000-abc123xyz"

"blue-saude-user"
// Valor: {"id":"user-1730064000000","name":"Paulo","email":"paulo@nuvtech.com","role":"admin"}
```

---

## Rotas

| Rota | Autenticação | Sidebar | Descrição |
|------|--------------|---------|-----------|
| `/login` | ❌ Pública | ❌ Não | Página de login |
| `/` | ✅ Protegida | ✅ Sim | Dashboard principal |
| `/setor/[id]` | ✅ Protegida | ✅ Sim | Detalhes do setor |
| `/setor/[id]/processo/[id]` | ✅ Protegida | ✅ Sim | Detalhes do processo |

---

## Estados da Aplicação

### 1. **Loading State**
```typescript
// Enquanto verifica autenticação
<div className="flex items-center justify-center min-h-screen">
  <div className="w-12 h-12 border-4 border-primary animate-spin" />
  <p>Carregando...</p>
</div>
```

### 2. **Não Autenticado**
```typescript
// Tela de login centralizada
// Sem sidebar
// Formulário de autenticação
```

### 3. **Autenticado**
```typescript
// Sidebar visível
// User info no footer
// Acesso a todas as rotas protegidas
```

---

## Troubleshooting

### Problema: "Stuck" na tela de login após fazer login

**Causa:** Token não está sendo salvo no localStorage

**Solução:**
```javascript
// Verificar no console do browser
localStorage.getItem('blue-saude-auth-token'); // Deve retornar o token
```

### Problema: Sidebar não aparece após login

**Causa:** LayoutContent não está renderizando corretamente

**Solução:**
```typescript
// Verificar no AuthContext se user está setado
console.log(useAuth().user); // Deve retornar objeto User
```

### Problema: Redirecionamento infinito

**Causa:** Lógica de proteção de rotas incorreta

**Solução:**
```typescript
// Verificar useEffect no AuthContext
// Garantir que isLoading está sendo atualizado corretamente
```

---

## Próximos Passos (Produção)

1. ✅ Integrar com backend real
2. ✅ Implementar JWT com expiração
3. ✅ Adicionar refresh token
4. ✅ Migrar para httpOnly cookies
5. ✅ Implementar rate limiting
6. ✅ Adicionar 2FA (Two-Factor Authentication)
7. ✅ Log de auditoria de acessos
8. ✅ Recuperação de senha
9. ✅ Confirmação de email
10. ✅ Roles e permissões (RBAC)

---

## Credenciais de Teste

Para testar a aplicação, use **qualquer** email/senha válida:

```
Email: admin@blue.com.br
Senha: 123456

Email: paulo@nuvtech.com
Senha: senha123

Email: teste@teste.com
Senha: 12345
```

Todos funcionam! O sistema mock aceita qualquer credencial válida.

---

**Desenvolvido por NUV Tech para Blue Saúde** 💙
