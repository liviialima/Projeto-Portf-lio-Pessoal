// Menu responsivo
const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principal");

botaoMenu.addEventListener("click", () => {
  const estaAberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", String(estaAberto));
  botaoMenu.setAttribute(
    "aria-label",
    estaAberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
  );
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
  });
});

// Saudação dinâmica conforme o horário local
const elementoSaudacao = document.querySelector("#saudacao");
const horaAtual = new Date().getHours();

if (horaAtual >= 5 && horaAtual < 12) {
  elementoSaudacao.textContent = "Bom dia! Seja bem-vindo(a).";
} else if (horaAtual >= 12 && horaAtual < 18) {
  elementoSaudacao.textContent = "Boa tarde! Seja bem-vindo(a).";
} else {
  elementoSaudacao.textContent = "Boa noite! Seja bem-vindo(a).";
}

// Modo claro e escuro
const botaoTema = document.querySelector("#tema-toggle");

botaoTema.addEventListener("click", () => {
  const modoClaroAtivo = document.body.classList.toggle("modo-claro");
  botaoTema.textContent = modoClaroAtivo ? "🌙" : "☀️";
  botaoTema.setAttribute(
    "aria-label",
    modoClaroAtivo ? "Ativar modo escuro" : "Ativar modo claro"
  );
});

// Ano automático no rodapé
document.querySelector("#ano-atual").textContent = new Date().getFullYear();

// Validação demonstrativa do formulário: não envia nem guarda dados
const formulario = document.querySelector("#form-contato");
const statusFormulario = document.querySelector("#status-formulario");

const campos = [
  { id: "nome", erroId: "erro-nome", mensagem: "Digite seu nome." },
  { id: "email", erroId: "erro-email", mensagem: "Digite um e-mail válido." },
  { id: "mensagem", erroId: "erro-mensagem", mensagem: "Escreva uma mensagem." }
];

function mostrarErro(campo, elementoErro, mensagem) {
  elementoErro.textContent = mensagem;
  campo.setAttribute("aria-invalid", "true");
}

function limparErro(campo, elementoErro) {
  elementoErro.textContent = "";
  campo.removeAttribute("aria-invalid");
}

campos.forEach(({ id, erroId }) => {
  const campo = document.getElementById(id);
  const elementoErro = document.getElementById(erroId);
  campo.addEventListener("input", () => limparErro(campo, elementoErro));
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  let formularioValido = true;

  const nome = document.querySelector("#nome");
  const email = document.querySelector("#email");
  const mensagem = document.querySelector("#mensagem");
  const consentimento = document.querySelector("#consentimento");

  campos.forEach(({ id, erroId }) => {
    limparErro(document.getElementById(id), document.getElementById(erroId));
  });
  document.querySelector("#erro-consentimento").textContent = "";
  consentimento.removeAttribute("aria-invalid");

  if (nome.value.trim().length < 2) {
    mostrarErro(nome, document.querySelector("#erro-nome"), "Informe um nome com pelo menos 2 caracteres.");
    formularioValido = false;
  }

  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoEmail.test(email.value.trim())) {
    mostrarErro(email, document.querySelector("#erro-email"), "Informe um endereço de e-mail válido.");
    formularioValido = false;
  }

  if (mensagem.value.trim().length < 5) {
    mostrarErro(mensagem, document.querySelector("#erro-mensagem"), "A mensagem deve ter pelo menos 5 caracteres.");
    formularioValido = false;
  }

  if (!consentimento.checked) {
    consentimento.setAttribute("aria-invalid", "true");
    document.querySelector("#erro-consentimento").textContent = "Marque o consentimento para continuar.";
    formularioValido = false;
  }

  if (formularioValido) {
    statusFormulario.textContent = "Tudo certo! A validação foi concluída. Este formulário é demonstrativo e não envia a mensagem.";
    formulario.reset();
    campos.forEach(({ id, erroId }) => {
      limparErro(document.getElementById(id), document.getElementById(erroId));
    });
  } else {
    statusFormulario.textContent = "Confira os campos destacados e tente novamente.";
    const primeiroCampoInvalido = formulario.querySelector('[aria-invalid="true"]');
    if (primeiroCampoInvalido) primeiroCampoInvalido.focus();
  }
});
