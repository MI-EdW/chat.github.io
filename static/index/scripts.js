// const textarea = document.getElementById('messageInput');

// textarea.addEventListener('input', () => {
//     textarea.style.height = 'auto';
//     textarea.style.height = `calc(${textarea.scrollHeight}px - 4px)`;
//     if (textarea.scrollHeight >= 200) {
//         textarea.style.height = '200px';
//     }
// });

// const messageInput = document.getElementById('messageInput');
// const messageContainer = document.querySelector('.message-container');

// function getCookie(name) {
//     const value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
//     return value ? value.pop() : null;
// }

// const username = getCookie('username');

// if (!username) {
//     window.location.href = "/create_login";
// }

// console.log(username)

// function sendMessage() {
//     const message = messageInput.value;
//     if (!message.trim()) return;

//     fetch('/send_message', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ username: username, message: message })
//     }).then(res => res.json())
//       .then(() => {
//           messageInput.value = '';
//           loadMessages();
//       });
// }

// function loadMessages() {
//     fetch('/get_messages')
//         .then(res => res.json())
//         .then(data => {
//             messageContainer.innerHTML = '';
//             data.forEach(msg => {
//                 const div = document.createElement('div');
//                 div.className = 'message';
//                 div.innerHTML = `<h5>${msg.username} <span style="font-size: 0.8em; color: gray">${msg.time}</span></h5><p>${msg.message}</p>`;
//                 messageContainer.appendChild(div);
//             });
//             messageContainer.scrollTop = messageContainer.scrollHeight;
//         });
// }

// // Отправка по Enter
// messageInput.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//         e.preventDefault();
//         sendMessage();
//         textarea.style.height = '30px';
//     }
// });

// // Автоподгрузка сообщений каждые 3 секунды
// setInterval(loadMessages, 500);
// loadMessages();

const textarea = document.getElementById('messageInput');

textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = `calc(${textarea.scrollHeight}px - 4px)`;
    if (textarea.scrollHeight >= 200) {
        textarea.style.height = '200px';
    }
});

const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector('.message-container');

// Функция для проверки, находится ли контейнер внизу
function isScrolledToBottom() {
    return messageContainer.scrollHeight - messageContainer.clientHeight <= messageContainer.scrollTop + 1;
}

// Функция для прокрутки вниз, если это необходимо
function scrollToBottom() {
    if (isScrolledToBottom()) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}

function getCookie(name) {
    const value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return value ? value.pop() : null;
}

const username = getCookie('username');

if (!username) {
    window.location.href = "/create_login";
}

console.log(username)

function sendMessage() {
    const message = messageInput.value;
    if (!message.trim()) return;

    fetch('/send_message', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: username, message: message })
    }).then(res => res.json())
      .then(() => {
          messageInput.value = '';
          loadMessages();
      });
}

function loadMessages() {
    fetch('/get_messages')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            messageContainer.innerHTML = '';
            data.forEach(msg => {
                const div = document.createElement('div');
                div.className = 'message';
                div.innerHTML = `<h5>${msg.username} <span style="font-size: 0.8em; color: gray">${msg.time}</span></h5><p>${msg.message}</p>`;
                messageContainer.appendChild(div);
            });
            scrollToBottom();  // Прокручиваем вниз, если необходимо
        });
}

// Отправка по Enter
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
        textarea.style.height = '30px';
    }
});

// Автоподгрузка сообщений каждые 3 секунды
setInterval(loadMessages, 500);
loadMessages();