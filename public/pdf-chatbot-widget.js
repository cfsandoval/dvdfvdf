(function () {
  const container = document.createElement("div");
  container.id = "pdf-chatbot";
  container.innerHTML = `
    <div id="pdf-chatbot-messages" style="max-height:200px;overflow:auto;border:1px solid #ccc;padding:8px;margin-bottom:4px"></div>
    <input id="pdf-chatbot-input" type="text" placeholder="Pregunta..." style="width:100%;padding:4px" />
  `;
  container.style.cssText =
    "position:fixed;bottom:20px;right:20px;width:300px;background:white;box-shadow:0 2px 6px rgba(0,0,0,0.2);padding:8px;font-family:sans-serif";
  document.body.appendChild(container);

  const messages = container.querySelector("#pdf-chatbot-messages");
  const input = container.querySelector("#pdf-chatbot-input");

  function addMessage(role, text) {
    const div = document.createElement("div");
    div.textContent = `${role}: ${text}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  async function ask(question) {
    const res = await fetch("/api/pdf-chatbot/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    addMessage("bot", data.answer);
  }

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && input.value.trim()) {
      const q = input.value.trim();
      addMessage("tú", q);
      ask(q);
      input.value = "";
    }
  });
})();
