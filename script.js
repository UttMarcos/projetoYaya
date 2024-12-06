document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');
  const feedbackList = document.getElementById('feedback-list');

  // URL do webhook gerado pelo Apps Script
  const webhookUrl = "https://script.google.com/macros/s/AKfycbwZ3ddBE4m61SESUcBUhtcdYGuXx9mQitNaIsgNyDenJBTmMc2U4Bt4VaUQ29qpklUMYg/exec";

  // Carregar dados do servidor e exibir na lista
  async function carregarFeedbacks() {
    try {
      const response = await fetch(webhookUrl); // Busca os dados do servidor
      const feedbacks = await response.json(); // Supõe que o Apps Script já suporte GET
      feedbackList.innerHTML = ""; // Limpa a lista antes de adicionar novos itens
      feedbacks.forEach(addFeedbackToList);
    } catch (error) {
      console.error("Erro ao carregar os feedbacks:", error);
    }
  }

  // Enviar dados do formulário ao servidor
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nomeComercio = document.getElementById('nomeComercio').value.trim();
    const descricao = document.getElementById('descricao').value.trim();

    if (nomeComercio === "" || descricao === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const feedback = { nomeComercio, descricao };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        alert("Informação enviada com sucesso!");
        addFeedbackToList(feedback); // Adiciona na lista local
        form.reset(); // Limpa o formulário
      } else {
        alert("Falha ao enviar os dados. Tente novamente mais tarde.");
        console.error("Erro no envio:", response.status, response.statusText);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      console.error("Erro ao conectar:", error);
    }
  });

  // Adicionar um feedback à lista na página
  function addFeedbackToList(feedback) {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${feedback.nomeComercio}:</strong>
      <p>${feedback.descricao}</p>
    `;
    feedbackList.appendChild(li);
  }

  // Carregar feedbacks ao iniciar
  carregarFeedbacks();
});
