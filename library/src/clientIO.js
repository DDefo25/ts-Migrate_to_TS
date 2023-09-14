const socket = io();
const form = document.querySelector('#commentary-form');
const input = document.querySelector('#commentary-input');
const messages = document.querySelector('#commentary-messages');

form.onsubmit = (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('commentary message', {msg: input.value});
        input.value = '';
    }
};

socket.on('commentary message', (message) => {
    console.log(socket.query)
    const locale = Intl.DateTimeFormat().resolvedOptions();
    const item = document.createElement('li');
    item.classList = 'list-group-item';
    item.innerHTML = `
        <div class="d-flex w-100 justify-content-end">
            <small>${new Date(message.date).toLocaleString(locale.locale, { timeZone: locale.timeZone })}</small>
        </div>
        <p class="mb-1">${message.msg}</p>`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});