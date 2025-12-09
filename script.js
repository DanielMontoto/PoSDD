// script.js
// --- SISTEMA LOGIN / REGISTRO ---
const authContainer = document.getElementById('authContainer');
const loginBox = document.getElementById('loginBox');
const registerBox = document.getElementById('registerBox');
const logoutBtn = document.getElementById('logoutBtn');

// botones y campos
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

const loginMsg = document.getElementById('loginMsg');
const regMsg = document.getElementById('regMsg');

// cambio entre login y registro
showRegister.addEventListener('click', () => {
  loginBox.classList.add('hidden');
  registerBox.classList.remove('hidden');
});

showLogin.addEventListener('click', () => {
  registerBox.classList.add('hidden');
  loginBox.classList.remove('hidden');
});

// registrar usuario
registerBtn.addEventListener('click', () => {
  const user = document.getElementById('regUser').value.trim();
  const pass = document.getElementById('regPass').value.trim();

  if(!user || !pass){
    regMsg.textContent = "Completa todos los campos";
    return;
  }

  if(localStorage.getItem("user_"+user)){
    regMsg.textContent = "El usuario ya existe";
    return;
  }

  // guardar usuario en localStorage
  localStorage.setItem("user_"+user, pass);
  regMsg.style.color = "green";
  regMsg.textContent = "Cuenta creada. Ahora inicia sesión.";
});

// login
loginBtn.addEventListener('click', () => {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  const savedPass = localStorage.getItem("user_"+user);

  if(savedPass === pass){
    localStorage.setItem("loggedUser", user);
    loginMsg.textContent = "";
    enterApp();
  } else {
    loginMsg.textContent = "Usuario o contraseña incorrectos";
  }
});

// cerrar sesión
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem("loggedUser");
  location.reload();
});

// entrar a la app
function enterApp(){
  authContainer.style.display = "none";
  logoutBtn.classList.remove("hidden");
}

// si ya está logueado
if(localStorage.getItem("loggedUser")){
  enterApp();
}

document.addEventListener('DOMContentLoaded', () => {
  // Navegación: mostrar/ocultar secciones
  const links = document.querySelectorAll('.main-nav a');
  const panels = document.querySelectorAll('.panel');

  function showSection(id){
    panels.forEach(p => p.id === id ? p.classList.remove('hidden') : p.classList.add('hidden'));
    links.forEach(a => a.dataset.section === id ? a.classList.add('active') : a.classList.remove('active'));
    // cerrar menu en móvil si está abierto
    document.getElementById('mainNav').classList.remove('nav-open');
    document.getElementById('navToggle').setAttribute('aria-expanded','false');
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });

  // Toggle menú mobile
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    const nav = document.getElementById('mainNav');
    const isOpen = nav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Funcionalidad de ventas (contador simple)
  const ventasHoy = document.getElementById('ventasHoy');
  const sumarVentaBtn = document.getElementById('sumarVenta');
  let ventas = 0;
  sumarVentaBtn.addEventListener('click', () => {
    ventas += 1;
    ventasHoy.textContent = ventas;
  });

  // Registrar venta desde sección "VENTAS"
  document.getElementById('hacerVenta').addEventListener('click', () => {
    const nombre = document.getElementById('prodName').value || 'Artículo';
    const precio = Number(document.getElementById('prodPrice').value) || 0;
    ventas += 1;
    ventasHoy.textContent = ventas;
    const result = document.getElementById('ventaResult');
    result.textContent = `Venta registrada: ${nombre} — ${precio.toFixed(2)} €`;
    setTimeout(()=> result.textContent = '', 4000);
  });

  // Chatbot simulado: responde con eco y algunas respuestas rápidas
  const chatbox = document.getElementById('chatbox');
  const chatInput = document.getElementById('chatInput');
  const sendChat = document.getElementById('sendChat');

  function appendMessage(text, who='bot'){
    const div = document.createElement('div');
    div.className = `message ${who==='user' ? 'user' : 'bot'}`;
    div.textContent = text;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  sendChat.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if(!text) return;
    appendMessage(text, 'user');
    chatInput.value = '';
    // respuestas simples
    setTimeout(() => {
      const lower = text.toLowerCase();
      if(lower.includes('stock') || lower.includes('almacén')) appendMessage('Hay 3 productos con bajo stock.');
      else if(lower.includes('venta')) appendMessage('Última venta registrada hace 5 minutos.');
      else appendMessage('Lo siento, soy una demo. Para más información contacte soporte.');
    }, 600);
  });

  // Inicial: mostrar home
  showSection('home');
});