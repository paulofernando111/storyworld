/* auth.js
   Gerencia estado de auth + render da area de conta no navbar.
   Usa:
   - localStorage.sw_users  => array de usuários cadastrados
   - localStorage.sw_user   => usuário atualmente logado
*/

function getUsers() {
  return JSON.parse(localStorage.getItem("sw_users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("sw_users", JSON.stringify(users));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("sw_user") || "null");
}
function setCurrentUser(user) {
  localStorage.setItem("sw_user", JSON.stringify(user));
}
function clearCurrentUser() {
  localStorage.removeItem("sw_user");
}

function logoutUser() {
  clearCurrentUser();
  renderAccountArea();
  // redireciona para index
  window.location.href = "index.html";
}

// Renderiza área de conta no navbar
function renderAccountArea() {
  const container = document.getElementById("nav-account");
  if (!container) return;
  const user = getCurrentUser();

  if (!user) {
    // não logado: mostrar botao entrar / registrar
    container.innerHTML = `
      <a class="btn small" href="login.html">Entrar</a>
      <a class="btn small ghost" href="register.html">Registrar</a>
    `;
    return;
  }

  // logado: mostrar avatar + dropdown
  const avatar = user.photo ? user.photo : "https://via.placeholder.com/40";
  const username = user.username || user.email;

  container.innerHTML = `
    <div class="profile-dropdown">
      <button class="profile-btn" id="profileToggle">
        <img src="${avatar}" alt="avatar" class="nav-avatar">
        <span class="nav-username">${username}</span>
        <span class="caret">▾</span>
      </button>
      <div class="profile-menu" id="profileMenu" aria-hidden="true">
        <a href="perfil.html">Ver Perfil</a>
        <a href="writer.html">Escrever</a>
        <button id="logoutInline">Sair</button>
      </div>
    </div>
  `;

  // eventos
  const toggle = document.getElementById("profileToggle");
  const menu = document.getElementById("profileMenu");
  const logoutBtn = document.getElementById("logoutInline");

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const shown = menu.getAttribute("aria-hidden") === "false";
    menu.setAttribute("aria-hidden", String(!shown));
  });

  logoutBtn.addEventListener("click", () => {
    logoutUser();
  });

  // fecha menu ao clicar fora
  document.addEventListener("click", () => {
    if (menu) menu.setAttribute("aria-hidden", "true");
  });
}

// chamar ao carregar
document.addEventListener("DOMContentLoaded", () => {
  renderAccountArea();
});

// expor logoutUser global para outras páginas (ex: botão) se necessário
window.logoutUser = logoutUser;
