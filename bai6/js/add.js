//Input form table
const cbSelectAll = document.getElementById("cb-select-all");
const jsCbAdd = document.getElementById("js-cbAdd");
const jsCbDel = document.getElementById("js-cbDel");
const jsCbSave = document.getElementById("js-cbSave");
const jsCbCancel = document.getElementById("js-cbCancel");
const jsDelItem = document.querySelector(".js-del");
const resultPR = document.getElementById("result-profile");
const footerBtn1 = document.querySelector(".footer-button");
const footerBtn2 = document.querySelector(".footer-button-two");
//Get value form input
const name = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
let profileContent = JSON.parse(localStorage.getItem("profileContent"));
const emailRegex = /^[^<>()[\]\\,;:\%\_\.\*\{\}\[\]\|\/\+\=\?\'#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/;
const phoneRegex = /^((09|03|07|08|05)+([0-9]{8}))/;

//Show html profile
showProfileItem = (id, name, phone, email) => {
    return `
        <tr id="edit-profile-${id}">
            <td scope="row">
                <input type="checkbox" class="checkbox-option" value="${id}">
            </td>
            <td class="name-${id}" onfocusout="handleOutFocusElement(${id})" contenteditable="false">${name}</td>
            <td class="phone-${id}" onfocusout="handleOutFocusElement(${id})" contenteditable="false">${phone}</td>
            <td class="email-${id}" onfocusout="handleOutFocusElement(${id})" contenteditable="false">${email}</td>
            <td class="button-del">
            <a href="javascript:void(0)" onclick="handleDeleteProfile(${id})">
                <i class="fa fa-trash"></i>
            </a>
            </td>
        </tr>
    `;
}

//Insert html profile
getProfileContent = (id, name, phone, email) => {
    resultPR.insertAdjacentHTML("afterend", showProfileItem(id, name, phone, email));
}

//Check toggle validator
checkValidator = (errorMessage = "") => {
    if (errorMessage) {
        mess({
            message: errorMessage,
            type: "error",
            duration: 3000
        });
    }
}

//Check required null
checkRequiredValue = (selector, errorMessage = "") => {
    if (selector.textContent.trim().length < 1) {
        checkValidator(`${errorMessage} is required`);
    }
}

//Function check Regex
checkRegexValidation = (selector, regex, errorMessage = "") => {
    if (!regex.test(selector.textContent)) {
        checkValidator(errorMessage);
    }
}

// check profile if have will forEach to HTML
if (profileContent) {
    profileContent.forEach(function (profileItem, index) {
        getProfileContent(index, profileItem.name, profileItem.phone, profileItem.email);
    });
}

//Add profile
addProfile = (name, phone, email) => {
    if (!name.textContent || !phone.textContent || !email.textContent) return;
    //Check Regex list
    checkRegexValidation(email, emailRegex, "Email invalid");
    checkRegexValidation(phone, phoneRegex, "Phone invalid");
    if (!emailRegex.test(email.textContent) || !phoneRegex.test(phone.textContent)) return;

    profileContent = JSON.parse(localStorage.getItem("profileContent"));
    if (profileContent) {
        profileContent.push({
            name: name.textContent,
            phone: phone.textContent,
            email: email.textContent,
        });
        localStorage.setItem("profileContent", JSON.stringify(profileContent));
    } else {
        const newProfileContent = { name: name.textContent, phone: phone.textContent, email: email.textContent };
        localStorage.setItem("profileContent", JSON.stringify([newProfileContent]));
    }
    location.reload();
}

handleDbClickElement = (selector) => {
    selector.ondblclick = function (e) {
        e.target.setAttribute('contenteditable', true);
        selector.focus();
    }
}

//Function update when out focus
handleOutFocusElement = (id) => {
    const outInputName = document.querySelector(".name-" + id);
    const outInputPhone = document.querySelector(".phone-" + id);
    const outInputEmail = document.querySelector(".email-" + id);
    if (!outInputName.textContent.trim() || !outInputPhone.textContent.trim() || !outInputEmail.textContent.trim()) return location.reload();
    profileContent = JSON.parse(localStorage.getItem("profileContent"));
    if (profileContent) {
        //Set attribute content edit table false;
        outInputName.setAttribute('contenteditable', false);
        outInputPhone.setAttribute('contenteditable', false);
        outInputEmail.setAttribute('contenteditable', false);
        profileContent.splice(id, 1, {
            name: outInputName.textContent,
            phone: outInputPhone.textContent,
            email: outInputEmail.textContent,
        });
        localStorage.setItem("profileContent", JSON.stringify(profileContent));
    }
}

//Function hnadle double click
handleElementValue = () => {
    profileContent = JSON.parse(localStorage.getItem("profileContent"));
    if (profileContent) {
        profileContent.forEach(function (element, index) {
            const inputName = document.querySelector(".name-" + index);
            const inputPhone = document.querySelector(".phone-" + index);
            const inputEmail = document.querySelector(".email-" + index);
            //Get value input
            handleDbClickElement(inputName);
            handleDbClickElement(inputPhone);
            handleDbClickElement(inputEmail);
        });
    }
}
handleElementValue();

//Event on click add profile
jsCbAdd.addEventListener('click', () => {
    //Check null value required
    checkRequiredValue(name, "Full name");
    checkRequiredValue(phone, "Phone");
    checkRequiredValue(email, "Email");
    //Add profile
    addProfile(name, phone, email);
});

// Select check box all
cbSelectAll.addEventListener('change', (e) => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    if (e.target.checked) {
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = true;
        });
    } else {
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    }
});

//Event js checkbox delete multiple
jsCbDel.addEventListener('click', (e) => {
    const checkboxes = document.querySelectorAll(".checkbox-option:checked");
    //Handle profile content on local storage
    profileContent = JSON.parse(localStorage.getItem("profileContent"));
    if (profileContent) {
        checkboxes.forEach(function (checkbox, index) {
            profileContent.splice(checkbox.value, 1);
        });
        localStorage.setItem("profileContent", JSON.stringify(profileContent));
        location.reload();
    }
});

//Function delete profile
handleDeleteProfile = (id) => {
    //Handle profile content on local storage
    profileContent = JSON.parse(localStorage.getItem("profileContent"));
    profileContent.splice(id, 1);
    localStorage.setItem("profileContent", JSON.stringify(profileContent));
    //Check id result item Yes or No => remove element tr
    const resultProfile = document.querySelector("#edit-profile-" + id);
    if (resultProfile) {
        resultProfile.remove();
    }
};
