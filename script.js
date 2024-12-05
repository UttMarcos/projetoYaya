// Função para lidar com o envio do formulário
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedback-form');
    const feedbackList = document.getElementById('feedback-list');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Capturar os dados do formulário
      const nomeComercio = document.getElementById('nomeComercio').value;
      const descricao = document.getElementById('descricao').value;
  
      // Criar um novo item para a lista
      const listItem = document.createElement('li');
      listItem.innerHTML = `<strong>${nomeComercio}:</strong> ${descricao}`;
  
      // Adicionar o item à lista
      feedbackList.appendChild(listItem);
  
      // Limpar os campos do formulário
      form.reset();
    });
  });
  
  // Selecionar elementos
const form = document.getElementById("feedback-form");
const feedbackList = document.getElementById("feedback-list");

// Carregar dados do localStorage ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.forEach(addFeedbackToList);
});

// Adicionar evento de envio do formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obter dados do formulário
  const nomeComercio = document.getElementById("nomeComercio").value.trim();
  const descricao = document.getElementById("descricao").value.trim();

  if (nomeComercio === "" || descricao === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Criar objeto de feedback
  const feedback = {
    nomeComercio,
    descricao,
  };

  // Salvar no localStorage
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.push(feedback);
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  // Adicionar feedback à lista na tela
  addFeedbackToList(feedback);

  // Limpar o formulário
  form.reset();
});

// Função para adicionar feedback à lista
function addFeedbackToList(feedback) {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${feedback.nomeComercio}:</strong>
    <p>${feedback.descricao}</p>
  `;
  feedbackList.appendChild(li);
}
