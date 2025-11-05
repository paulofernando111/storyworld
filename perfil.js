// ========= VERIFICAR LOGIN =========
const currentUser = JSON.parse(localStorage.getItem("sw_user"));
if (!currentUser) {
  alert("Você precisa estar logado para ver seu perfil!");
  window.location.href = "login.html";
}

// ========= CARREGAR DADOS DO PERFIL =========
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("profile-username").innerText = currentUser.username;
  document.getElementById("profile-email").innerText = currentUser.email;
  document.getElementById("profile-bio").innerText = currentUser.bio || "Nenhuma bio adicionada ainda...";

  // Carregar foto de perfil e banner, se existirem
  if (currentUser.photo) {
    document.getElementById("profile-photo").src = currentUser.photo;
  }
  if (currentUser.banner) {
    document.getElementById("banner-img").src = currentUser.banner;
  }

  // Coloca valores no formulário de edição
  document.getElementById("edit-username").value = currentUser.username;
  document.getElementById("edit-bio").value = currentUser.bio || "";
});

// ========= TROCA DE ABAS =========
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContent = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContent.forEach(tab => tab.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.getAttribute("data-tab")).classList.add("active");
  });
});

// ========= ALTERAR FOTO DE PERFIL =========
document.getElementById("photo-upload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("profile-photo").src = reader.result;
    currentUser.photo = reader.result;
    localStorage.setItem("sw_user", JSON.stringify(currentUser));
  };
  reader.readAsDataURL(file);
});

// ========= ALTERAR FOTO DE CAPA =========
document.getElementById("banner-upload").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("banner-img").src = reader.result;
    currentUser.banner = reader.result;
    localStorage.setItem("sw_user", JSON.stringify(currentUser));
  };
  reader.readAsDataURL(file);
});

// ========= SALVAR EDIÇÕES DO PERFIL =========
document.getElementById("save-profile-btn").addEventListener("click", () => {
  const newName = document.getElementById("edit-username").value.trim();
  const newBio = document.getElementById("edit-bio").value.trim();

  if (newName === "") {
    alert("O nome de usuário não pode estar vazio!");
    return;
  }

  currentUser.username = newName;
  currentUser.bio = newBio;

  localStorage.setItem("sw_user", JSON.stringify(currentUser));

  document.getElementById("profile-username").innerText = newName;
  document.getElementById("profile-bio").innerText = newBio || "Nenhuma bio adicionada ainda...";
  alert("Perfil atualizado com sucesso!");
});
