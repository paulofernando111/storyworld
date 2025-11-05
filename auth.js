// auth.js

document.addEventListener("DOMContentLoaded", () => {
  const navAccount = document.getElementById("nav-account");

  // Verifica se há usuário logado no localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // Se estiver logado → mostra botão de perfil + sair
    navAccount.innerHTML = `
      <div class="user-menu">
        <span>👤 ${user.username}</span>
        <button id="perfilBtn">Perfil</button>
        <button id="logoutBtn">Sair</button>
      </div>
    `;

    // Botão de perfil
    document.getElementById("perfilBtn").addEventListener("click", () => {
      window.location.href = "perfil.html"; // ✅ Corrigido
    });

    // Botão de logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.reload();
    });

  } else {
    // Se NÃO estiver logado → mostra login/cadastro
    navAccount.innerHTML = `
      <div class="auth-links">
        <a href="login.html">Entrar</a>
        <a href="register.html">Cadastrar</a>
      </div>
    `;
  }
});
