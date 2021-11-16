
//Input message
const inputMsg1 = document.querySelector(".section-1 .message_input");
const inputMsg2 = document.querySelector(".section-2 .message_input");
//Input send message
const inputSend1 = document.querySelector(".section-1 .message-send-btn");
const inputSend2 = document.querySelector(".section-2 .message-send-btn");
//Chat show
const msgChat1 = document.querySelector(".section-1 .chat-show");
const msgChat2 = document.querySelector(".section-2 .chat-show");
//Input btn style section 1
const btnBoldMsg1 = document.querySelector('.section-1 .btn-bold');
const btnItalicMsg1 = document.querySelector('.section-1 .btn-italic');
//Input btn style section 2
const btnBoldMsg2 = document.querySelector('.section-2 .btn-bold');
const btnItalicMsg2 = document.querySelector('.section-2 .btn-italic');
//Input reset message
const btnResetMsg1 = document.querySelector('.section-1 .btn-reset');
const btnResetMsg2 = document.querySelector('.section-2 .btn-reset');
//Set avatar
const avatarPr1 = "./img/brother-duy.png";
const avatarPr2 = "./img/avatar-chatwork.jpg";
let msgContent = JSON.parse(localStorage.getItem("msgContent"));

//Function submit form
function formSendSubmit(personSend, msgSelector) {
    const textMsg = msgSelector.innerHTML.trim();
    msgContent = JSON.parse(localStorage.getItem("msgContent"));
    //Check text message empty
    if (!textMsg) return;
    //Check message content
    if (msgContent) {
        msgContent.push({
            id: msgContent.length + 1,
            personSend: personSend,
            textMsg: textMsg,
        });
        localStorage.setItem("msgContent", JSON.stringify(msgContent));
    } else {
        const newMsgContent = { id: 1, personSend: personSend, textMsg: textMsg };
        localStorage.setItem("msgContent", JSON.stringify([newMsgContent]));
    }
    getMsgContentItem(personSend, textMsg);
    //Clear text & disabled btn
    clearValue(msgSelector);
    disabledTrue(personSend);
}

// Check message content exist or not => show on html
if (msgContent) {
    msgContent.forEach(function (item) {
        getMsgContentItem(item.personSend, item.textMsg);
    });
}

//Get Content Message Item
function getMsgContentItem(personSend, message) {
    if (personSend === 2) {
        msgChat1.insertAdjacentHTML("beforeend", showMsgItem(avatarPr2, message, "right"));
        msgChat2.insertAdjacentHTML("beforeend", showMsgItem(avatarPr2, message, "left"));
    } else {
        msgChat1.insertAdjacentHTML("beforeend", showMsgItem(avatarPr1, message, "left"));
        msgChat2.insertAdjacentHTML("beforeend", showMsgItem(avatarPr1, message, "right"));
    }
}

//Show message item
function showMsgItem(avatar, message, side) {
    return `<div class="message ${side}-message">
                <div class="message-avatar" style="background-image: url(${avatar})"></div>
                <div class="message-text-title">
                    <div class="message-text">
                        ${message}
                    </div>
                </div>
            </div>`;
}

//Clear Value when submit form
function clearValue(msgSelector) {
    msgSelector.innerHTML = "";
}

function disabledTrue(personSend) {
    if (personSend === 2) {
        inputSend1.disabled = true;
    } else {
        inputSend2.disabled = true;
    }
}

//Function on input text content disabled
function onInputValue(selector, str) {
    if (str.trim().length > 0) {
        selector.disabled = false;
    } else {
        selector.disabled = true;
    }
}

//Input send message 1
inputSend1.addEventListener('click', () => {
    formSendSubmit(2, inputMsg1);
});

//Input send message 2
inputSend2.addEventListener('click', () => {
    formSendSubmit(1, inputMsg2);
});

//On input message 1
inputMsg1.addEventListener("input", (e) => {
    const str = e.target.textContent;
    onInputValue(inputSend1, str);
});

//On input message 2
inputMsg2.addEventListener("input", (e) => {
    const str = e.target.textContent;
    onInputValue(inputSend2, str);
});

//Reset btn 1 data form
btnResetMsg1.addEventListener('click', () => {
    btnBoldMsg1.classList.remove("active");
    btnItalicMsg1.classList.remove("active");
    if (inputMsg1.innerHTML) {
        inputMsg1.innerHTML = "";
        inputSend1.disabled = true;
    }
});

//Reset btn 2 data form
btnResetMsg2.addEventListener('click', () => {
    btnBoldMsg2.classList.remove("active");
    btnItalicMsg2.classList.remove("active");
    if (inputMsg2.innerHTML) {
        inputMsg2.innerHTML = "";
        inputSend2.disabled = true;
    }
});

//Input style message 1
btnBoldMsg1.addEventListener("click", (e) => {
    inputMsg1.focus();
    document.execCommand('bold', false, null);
    e.target.classList.toggle("active");
});

btnItalicMsg1.addEventListener("click", (e) => {
    inputMsg1.focus();
    document.execCommand('italic', false, null);
    e.target.classList.toggle("active");
});

//Input style message 2
btnBoldMsg2.addEventListener("click", (e) => {
    inputMsg2.focus();
    document.execCommand('bold', false, null);
    e.target.classList.toggle("active");
});

btnItalicMsg2.addEventListener("click", (e) => {
    inputMsg2.focus();
    document.execCommand('italic', false, null);
    e.target.classList.toggle("active");
});
