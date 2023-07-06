const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
   e.preventDefault();

   const listaRespostas = {
      nome: e.target.elements["nome"].value,
      email: e.target.elements["email"].value,
      assunto: e.target.elements["assunto"].value,
      mensagem: e.target.elements["mensagem"].value,
   };

   const params = new URLSearchParams();
   params.append("subject", listaRespostas.assunto);
   params.append(
      "body",
      `      Nome: ${listaRespostas.nome}
      Email: ${listaRespostas.email}
      Mensagem: ${listaRespostas.mensagem}`
   );

   const mailtoLink = `mailto:manoaraujo@gmail.com?${params
      .toString()
      .replaceAll("+", " ")}`;

   window.location.href = mailtoLink;
});

camposDoFormulario.forEach((campo) => {
   campo.addEventListener("blur", () => verificaCampo(campo));
   campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

const tiposDeErro = [
   "valueMissing",
   "typeMismatch",
   "patternMismatch",
   "tooShort",
   "customError",
];

const mensagens = {
   nome: {
      valueMissing: "O campo de nome não pode estar vazio.",
      patternMismatch: "Por favor, preencha um nome válido.",
      tooShort: "Por favor, preencha um nome válido.",
   },
   email: {
      valueMissing: "O campo de e-mail não pode estar vazio.",
      typeMismatch: "Por favor, preencha um email válido.",
      tooShort: "Por favor, preencha um e-mail válido.",
   },
   assunto: {
      valueMissing: "O campo pode estar vazio.",
      tooShort: "O campo não tem caracteres suficientes.",
   },
   mensagem: {
      valueMissing: "O campo pode estar vazio.",
      tooShort: "O campo não tem caracteres suficientes.",
   },
};

function verificaCampo(campo) {
   let mensagem = "";
   campo.setCustomValidity("");
   tiposDeErro.forEach((erro) => {
      if (campo.validity[erro]) {
         mensagem = mensagens[campo.name][erro];
         console.log(mensagem);
      }
   });

   const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
   const validadorDeInput = campo.checkValidity();

   if (!validadorDeInput) {
      mensagemErro.textContent = mensagem;
   } else {
      mensagemErro.textContent = "";
   }
}
