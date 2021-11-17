// Mess function
function mess({ title = "Hệ thống", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("mess");
    if (main) {
        const mess = document.createElement("div");

        // Auto remove mess
        const autoRemoveId = setTimeout(function () {
            main.removeChild(mess);
        }, duration + 1000);

        // Remove mess when clicked
        mess.onclick = function (e) {
            if (e.target.closest(".mess__close")) {
                main.removeChild(mess);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "fa fa-check-circle",
            info: "fa fa-info-circle",
            warning: "fa fa-exclamation-circle",
            error: "fa fa-exclamation-triangle"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        mess.classList.add(`mess-${type}`, `mess--${type}`);
        mess.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        mess.innerHTML = `
                    <div class="mess__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="mess__body">
                        <h3 class="mess__title">${title}</h3>
                        <p class="mess__msg">${message}</p>
                    </div>
                `;
        main.appendChild(mess);
    }
}
