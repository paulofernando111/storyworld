// Verifica se o usuário está logado ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("sw_user"));
  if (!user) {
    window.location.href = "login.html"; // Se não estiver logado, redireciona
    return;
  }

  // Preenche os dados do usuário no perfil
  document.getElementById("display-username").textContent = user.username;
  document.getElementById("display-email").textContent = user.email;
  document.getElementById("display-bio").textContent = user.bio || "";
  document.getElementById("profile-img").src = user.photo || "https://via.placeholder.com/120";
  document.getElementById("profile-cover").src = user.cover || "https://via.placeholder.com/1200x300";
});

// Abre o modal de edição
function openEditModal() {
  const user = JSON.parse(localStorage.getItem("sw_user"));
  document.getElementById("edit-username").value = user.username;
  document.getElementById("edit-bio").value = user.bio || "";
  document.getElementById("editProfileModal").style.display = "flex";
}

// Fecha o modal de edição
function closeEditModal() {
  document.getElementById("editProfileModal").style.display = "none";
}

// Salva as edições feitas
function saveProfile() {
  let user = JSON.parse(localStorage.getItem("sw_user"));
  user.username = document.getElementById("edit-username").value;
  user.bio = document.getElementById("edit-bio").value;
  localStorage.setItem("sw_user", JSON.stringify(user));
  location.reload(); // Recarrega para atualizar as informações
}

// Troca da foto de perfil
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

// Troca de capa
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

// Sistema de troca de abas do perfil
function openTab(evt, tabName) {
  const contents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  contents.forEach(content => content.classList.remove("active"));
  buttons.forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}
