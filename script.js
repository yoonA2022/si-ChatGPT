const messageInput = document.getElementById("message-input");
const messageList = document.getElementById("message-list");
const sendButton = document.getElementById("send-button");
const checkbox = document.querySelector("input[name=theme]");

function addMessage() {
    const message = messageInput.value.trim();
    if (message) {
    const messageElement = document.createElement("li");
    messageElement.textContent = message;
    messageList.appendChild(messageElement);
    messageInput.value = "";
    }
}

sendButton.addEventListener("click", addMessage);

messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
    addMessage();
    }
});

checkbox.addEventListener("change", function() {
    if (this.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    } else {
    document.documentElement.setAttribute("data-theme", "light");
    }
});