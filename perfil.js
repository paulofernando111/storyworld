<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Perfil | StoryWorld</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar">
  <a href="index.html" class="logo">StoryWorld</a>
  <ul class="nav-links">
    <li><a href="catalog.html">Catálogo</a></li>
    <li><a href="writer.html">Escrever</a></li>
    <li><a href="search.html">Buscar</a></li>
  </ul>
  <div id="nav-account"></div>
</nav>

<!-- CAPA DO PERFIL -->
<div class="profile-header">
  <img id="profile-cover" src="https://via.placeholder.com/1200x300" alt="Capa do Perfil">
  <label for="upload-cover" class="edit-cover-btn">Alterar Capa</label>
  <input type="file" id="upload-cover" accept="image/*" style="display: none;">
</div>

<!-- INFOS DO PERFIL -->
<div class="profile-info">
  <img id="profile-img" class="profile-avatar" src="https://via.placeholder.com/120" alt="Foto de perfil">
  <div class="user-details">
    <h2 id="display-username">Nome do Usuário</h2>
    <p id="display-email" class="user-email"></p>
    <p id="display-bio" class="user-bio"></p>
  </div>
  <button class="edit-profile-btn" onclick="openEditModal()">Editar Perfil</button>
</div>

<!-- ABAS DO PERFIL -->
<div class="profile-tabs">
  <button class="tab-btn active" onclick="openTab(event, 'stories')">📚 Minhas Histórias</button>
  <button class="tab-btn" onclick="openTab(event, 'favorites')">❤️ Favoritas</button>
  <button class="tab-btn" onclick="openTab(event, 'playlists')">🎧 Playlists</button>
</div>

<!-- CONTEÚDOS DAS ABAS -->
<div id="stories" class="tab-content active">
  <p>Você ainda não publicou nenhuma história.</p>
</div>

<div id="favorites" class="tab-content">
  <p>Nenhuma história favorita ainda.</p>
</div>

<div id="playlists" class="tab-content">
  <p>Você ainda não criou nenhuma playlist.</p>
</div>

<!-- MODAL DE EDIÇÃO -->
<div id="editProfileModal" class="modal">
  <div class="modal-content">
    <h3>Editar Perfil</h3>
    <label>Nome de Usuário</label>
    <input type="text" id="edit-username">

    <label>Biografia</label>
    <textarea id="edit-bio" rows="3"></textarea>

    <label>Alterar Foto de Perfil</label>
    <input type="file" id="upload-photo" accept="image/*">

    <div class="modal-actions">
      <button onclick="saveProfile()">Salvar</button>
      <button onclick="closeEditModal()" class="cancel-btn">Cancelar</button>
    </div>
  </div>
</div>

<script src="auth.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("sw_user"));
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    document.getElementById("display-username").textContent = user.username;
    document.getElementById("display-email").textContent = user.email;
    document.getElementById("display-bio").textContent = user.bio || "";
    document.getElementById("profile-img").src = user.photo || "https://via.placeholder.com/120";
    document.getElementById("profile-cover").src = user.cover || "https://via.placeholder.com/1200x300";
  });

  function openEditModal() {
    const user = JSON.parse(localStorage.getItem("sw_user"));
    document.getElementById("edit-username").value = user.username;
    document.getElementById("edit-bio").value = user.bio || "";
    document.getElementById("editProfileModal").style.display = "flex";
  }

  function closeEditModal() {
    document.getElementById("editProfileModal").style.display = "none";
  }

  function saveProfile() {
    let user = JSON.parse(localStorage.getItem("sw_user"));
    user.username = document.getElementById("edit-username").value;
    user.bio = document.getElementById("edit-bio").value;
    localStorage.setItem("sw_user", JSON.stringify(user));
    location.reload();
  }

  document.getElementById("upload-photo").addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      let user = JSON.parse(localStorage.getItem("sw_user"));
      user.photo = reader.result;
      localStorage.setItem("sw_user", JSON.stringify(user));
      document.getElementById("profile-img").src = reader.result;
    };
    if (file) reader.readAsDataURL(file);
  });

  document.getElementById("upload-cover").addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      let user = JSON.parse(localStorage.getItem("sw_user"));
      user.cover = reader.result;
      localStorage.setItem("sw_user", JSON.stringify(user));
      document.getElementById("profile-cover").src = reader.result;
    };
    if (file) reader.readAsDataURL(file);
  });

  function openTab(evt, tabName) {
    const contents = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-btn");

    contents.forEach(content => content.classList.remove("active"));
    buttons.forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
  }
</script>
</body>
</html>
