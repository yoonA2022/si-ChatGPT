document.getElementById('alertButton').addEventListener('click', function() {
    alert('Hello, this is My Simple Webpage!');
});

const commentForm = document.getElementById('commentForm');
const commentsContainer = document.getElementById('commentsContainer');

commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const commentText = document.getElementById('comment').value;

    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = '<strong>' + name + ':</strong> ' + commentText;

    commentsContainer.appendChild(commentElement);

    commentForm.reset();
});

const chatForm = document.getElementById('chatForm');
const chatContainer = document.getElementById('chatContainer');
const apiUrl = "https://ybapi.cn/API/gpt_ty.php?msg=";

chatForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const userInput = document.getElementById('userInput').value;
    displayMessage('User', userInput);

    const response = await fetch(apiUrl + encodeURIComponent(userInput));
    const botResponse = await response.text();
    displayMessage('Bot', botResponse);

    chatForm.reset();
    chatContainer.scrollTop = chatContainer.scrollHeight;
});

function displayMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.className = 'message message-' + sender.toLowerCase();
    messageElement.textContent = sender + ': ' + message;
    chatContainer.appendChild(messageElement);
}

const languageSelector = document.getElementById('language');

languageSelector.addEventListener('change', async function () {
    const targetLanguage = languageSelector.value;
    if (!targetLanguage) {
        location.reload();
        return;
    }

    const allTextNodes = getTextNodes(document.body);
    for (const textNode of allTextNodes) {
        const originalText = textNode.textContent.trim();
        const translatedText = await translateText(originalText, targetLanguage);
        textNode.textContent = translatedText;
    }
});

function getTextNodes(element) {
    const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let currentNode;
    while (currentNode = walk.nextNode()) {
                if (currentNode.parentNode.tagName !== 'SCRIPT') {
            textNodes.push(currentNode);
        }
    }
    return textNodes;
}

async function translateText(text, targetLanguage) {
    const apiUrl = 'https://api.mymemory.translated.net/get?langpair=en|' + targetLanguage + '&q=' + encodeURIComponent(text);
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.responseData.translatedText;
}
