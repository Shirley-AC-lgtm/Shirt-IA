// =========================================
// SHIRT AI
// Chat functionality
// =========================================


// ---------- ELEMENTS ----------

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");
const typingIndicator = document.getElementById("typingIndicator");


// ---------- SEND MESSAGE ----------

function sendMessage() {

    const text = messageInput.value.trim();

    // Do nothing if the message is empty
    if (text === "") {
        return;
    }


    // Create the user's message
    addUserMessage(text);


    // Clear input
    messageInput.value = "";


    // Show typing animation
    showTyping();


    // Simulate AI thinking
    setTimeout(() => {

        hideTyping();

        addAIMessage(
            "Hello! I'm Shirt AI. I'm still being connected to my AI system, but soon I'll be able to have real conversations with you. 🤖"
        );

    }, 1500);

}


// ---------- USER MESSAGE ----------

function addUserMessage(text) {

    const message = document.createElement("div");

    message.classList.add(
        "message",
        "user-message"
    );


    message.innerHTML = `
    < div class="message-content" >

            <span class="message-name">
                You
            </span>

            <p></p>

        </div >
    `;


    // Put text safely inside the paragraph
    message.querySelector("p").textContent = text;


    messages.appendChild(message);


    scrollToBottom();

}


// ---------- AI MESSAGE ----------

function addAIMessage(text) {

    const message = document.createElement("div");

    message.classList.add(
        "message",
        "ai-message"
    );


    message.innerHTML = `
    < div class="message-avatar" >
        SA
        </div >

    <div class="message-content">

        <span class="message-name">
            Shirt AI
        </span>

        <p></p>

    </div>
`;


    // Put AI response safely inside paragraph
    message.querySelector("p").textContent = text;


    messages.appendChild(message);


    scrollToBottom();

}


// ---------- TYPING INDICATOR ----------

function showTyping() {

    typingIndicator.style.display = "flex";

    scrollToBottom();

}


function hideTyping() {

    typingIndicator.style.display = "none";

}


// ---------- SCROLL ----------

function scrollToBottom() {

    messages.scrollTop = messages.scrollHeight;

}


// ---------- SEND BUTTON ----------

sendButton.addEventListener(
    "click",
    sendMessage
);


// ---------- ENTER KEY ----------

messageInput.addEventListener(
    "keydown",
    function(event) {

        // Enter sends the message
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);