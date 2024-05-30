const ashuSelectorBtn = document.querySelector('#ashu-selector');
const mauSelectorBtn = document.querySelector('#mau-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

//const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) =>  `
    <div class="message ${message.sender ==='Ashu' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
  `

//   window.onload = () => {
//     messages.forEach((message) => {
//         chatMessages.innerHTML += createChatMessageElement(message);
//     });
//   }
let messages = [];
try {
    // Attempt to parse the stored messages
    const storedMessages = JSON.parse(localStorage.getItem('messages'));
    // Ensure the parsed data is an array
    if (Array.isArray(storedMessages)) {
        messages = storedMessages;
    } else {
        console.error('Expected messages to be an array, received:', storedMessages);
        // Optionally, fix the structure in localStorage
        localStorage.setItem('messages', JSON.stringify([]));
    }
} catch (e) {
    console.error('Error parsing messages from localStorage:', e);
    // Reset to default in case of parsing error
    localStorage.setItem('messages', JSON.stringify([]));
}


    let messageSender = 'Ashu';

    const updateMeaasageSender = (name) => {
    messageSender = name 
    chatHeader.innerText = `${messageSender} chatting...`;
    chatInput.placeholder = `Type here, ${messageSender}...`;
    

        if (name === 'Ashu'){
            ashuSelectorBtn.classList.add('active-person');
            mauSelectorBtn.classList.remove('active-person');
        }
        if (name === 'Mau'){
            mauSelectorBtn.classList.add('active-person');
            ashuSelectorBtn.classList.remove('active-person');
        }
        chatInput.focus();
    }

    ashuSelectorBtn.onclick = () => updateMeaasageSender('Ashu');
    mauSelectorBtn.onclick = () => updateMeaasageSender('Mau');


    const sendMessage = (e) => {
        e.preventDefault();

        const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute:'numeric', hour12:true});
        const message = {
            sender: messageSender,
            text: chatInput.value, 
            timestamp, 
        }
         messages.push(message);

        localStorage.setItem('messages',JSON.stringify(message));
        chatMessages.innerHTML += createChatMessageElement(message);

        chatInputForm.reset();

        chatMessages.scrollTop = chatMessages.scrollHeight;

    }
chatInputForm.addEventListener('submit',sendMessage);

clearChatBtn.addEventListener('click', () => {
        localStorage.clear();
        chatMessages.innerHTML = '';
    });
    