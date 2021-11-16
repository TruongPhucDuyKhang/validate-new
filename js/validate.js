// Get on input element form
const inputElement = document.getElementById("form-validate");
const clickElement = document.getElementById("js_add");
const refreshElement = document.getElementById("js_refresh");
const fileElement = document.getElementById("js_add_avatar");
const inputFile = document.getElementById('upload');
const showImage = document.getElementById('show-image');
const borderElement = document.querySelector('.preview-avatar');
const colorElement = document.querySelector('.avatar i');
//Regular expression
const fullnameRegex = /[a-zA-Z]+([a-zA-Z]|\s|Á|À|Ạ|Ã|Ả|Ă|Ắ|Ằ|Ẳ|Ặ|Ẵ|Â|Ấ|Ầ|Ẫ|Ẩ|Ậ|É|È|Ẽ|Ẻ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ|Ì|Í|Ĩ|Ị|Ỉ|Ò|Ó|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ộ|Ổ|Ỗ|Ơ|Ớ|Ờ|Ở|Ợ|Ỡ|Ú|Ù|Ủ|Ụ|Ũ|Ư|Ứ|Ừ|Ữ|Ử|Ự|Ý|Ỳ|Ỹ|Ỵ|Ỷ|Đ|á|à|ạ|ã|ả|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẫ|ẩ|ậ|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ể|ễ|ệ|ì|í|ĩ|ị|ỉ|ò|ó|ỏ|õ|ọ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ở|ợ|ỡ|ú|ù|ủ|ụ|ũ|ư|ứ|ừ|ữ|ử|ự|ý|ỳ|ỹ|ỵ|ỷ|đ)+$/;
const emailRegex    = /^[^<>()[\]\\,;:\%\_\.\*\{\}\[\]\|\/\+\=\?\'#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/;
const phoneRegex    = /^((09|03|07|08|05)+([0-9]{8}))/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const birthdayRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

//Function save form
function saveForm(result) {
    const listInvalid    = document.querySelectorAll("input.is-invalid");
    const resultFullname = document.querySelector('.fullname');
    const resultEmail    = document.querySelector('.email');
    const resultPhone    = document.querySelector('.phone');
    const resultBirthday = document.querySelector('.birthday');
    const fileImage = document.getElementById('preview-img');
    //Check list invalid exist => return all values not run
    if (listInvalid.length) return;

    resultFullname.innerText = result.name;
    resultEmail.innerText    = result.email.toLowerCase();
    resultPhone.innerText    = result.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    resultBirthday.innerText = result.birthday;

    //Upload image form
    return fileImage ? document.querySelector('.show-img-add').innerHTML = `<img src="${fileImage.src}" alt="" />` : '';
}

//Function reset form
function refreshElementForms() {
    const listValids = document.querySelectorAll("input.is-valid");
    const listInvalids = document.querySelectorAll("input.is-invalid");
    const inputForm  = document.getElementById("form-validate");
    const previewImg = document.getElementById("preview-img");
    //Reset border is-invalid
    listInvalids.forEach(listInvalid => listInvalid.classList.remove("is-invalid"));
    //Reset border is-valid
    listValids.forEach(listValid => listValid.classList.remove("is-valid"));
    //Reset class is-required images
    borderElement.classList.remove("is-required");
    colorElement.classList.remove("is-required");
    //Reset form and remove valid text == ''
    inputForm.reset();
    document.querySelector(".invalid-feedback").innerText = '';

    return previewImg ? previewImg.remove() : '';
}

//toggle Class Validation
function checkValidator(selector, errorMessage = "") {
    if (errorMessage) {
      selector.classList.add("is-invalid");
      selector.classList.remove("is-valid");
      selector.nextElementSibling.textContent = errorMessage;
    } else {
      selector.classList.add("is-valid");
      selector.classList.remove("is-invalid");
    }
}

//Function check Regex
function checkRegexValidation(selector, regex, errorMessage = "") {
    if (!regex.test(selector.value)) {
        checkValidator(selector, errorMessage);
    }
}

//Functon check Required Between Length
function isBetween(selector, filed, minLength, maxLength) {
    if (selector.value.trim().length < minLength || selector.value.trim().length > maxLength) {
        return checkValidator(
        selector,
            `${filed} min length is ${minLength} - max length is ${maxLength} characters`
        );
    } else {
        checkValidator(selector);
    }
}

//Functon check Required max Length
function checkRequiredMaxLength(selector, filed, maxLength) {
    if (selector.value.trim().length > maxLength) {
        return checkValidator(
        selector,
            `${filed} max length is ${maxLength} characters`
        );
    } else {
        checkValidator(selector);
    }
}

//Functon check empty value
function checkRequiredValue(selector, errorMessage = "") {
    if (selector.value.trim().length < 1) {
      checkValidator(selector, `${errorMessage} is required`);
    }
}

//On input form
inputElement.fullname.addEventListener("input", function () {
    isBetween(this, "Full name", 8, 30);
    checkRegexValidation(this, fullnameRegex, "Full name invalid");
});

inputElement.email.addEventListener("input", function () {
    if (!emailRegex.test(this.value)) {
        checkValidator(this, "Email invalid");
    } else {
        checkValidator(this);
    }
});

inputElement.phone.addEventListener("input", function () {
    checkRequiredMaxLength(this, "Phone", 10);
    checkRegexValidation(this, phoneRegex, "Phone start 0 Ex: 0903070508");
});

inputElement.birthday.addEventListener("input", function () {
    const date = new Date();
    const year = this.value.split('/');
    if (!birthdayRegex.test(this.value) || year[2] > date.getFullYear()) {
        checkValidator(this, "Birthday invalid");
    } else {
        checkValidator(this);
    }
});

inputElement.password.addEventListener("input", function () {
    isBetween(this, "Password", 8, 30);
    checkRegexValidation(this, passwordRegex, "Password must contain special characters");
});

inputElement.confirm_password.addEventListener("input", function () {
    if (this.value !== inputElement.password.value) {
        checkValidator(this, "Confirm password invalid");
    } else {
        checkValidator(this);
    }
});

//Click Element form
clickElement.addEventListener('click', function(e) {
    e.preventDefault();
    //Requried values form
    checkRequiredValue(inputElement.fullname, "Full name");
    checkRequiredValue(inputElement.email, "Email");
    checkRequiredValue(inputElement.phone, "Phone");
    checkRequiredValue(inputElement.birthday, "Birthday");
    checkRequiredValue(inputElement.password, "Password");
    checkRequiredValue(inputElement.confirm_password, "Confirm password");
    //Add form
    const result = {
        name: inputElement.fullname.value,
        email: inputElement.email.value,
        phone: inputElement.phone.value,
        birthday: inputElement.birthday.value
    };
    saveForm(result);
});

//Reset Element form
refreshElement.addEventListener('click', function() {
    refreshElementForms();
});

//UpperCase for Full name
inputElement.fullname.addEventListener('change', function() {
    const valueString = this.value;
    const splitStr = valueString.toLowerCase().split(" ");

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i]  = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);
    }

    return this.value = splitStr.join(' ');
});

//Click element files
fileElement.addEventListener('click', function() {
    //Click input file hidden form
    inputFile.click();
});


//Preview change image when upload
inputFile.addEventListener('change', function(e) {
    const [file] = e.target.files;
    const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
    //Search array file type
    let check = fileTypes.includes(file.type);

    if (file && !!check) {
        const fileToLoad = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            const srcData  = event.target.result;
            borderElement.classList.remove("is-required");
            colorElement.classList.remove("is-required");
            showImage.innerHTML = `<img src="${srcData}" alt="" id="preview-img"/>`;
        }
        fileReader.readAsDataURL(fileToLoad);
    } else {
        borderElement.classList.add("is-required");
        colorElement.classList.add("is-required");
        showImage.innerHTML = '';
        alert("JPEG, GIF, and PNG only");
    }
});

// Browser key
document.onkeyup = function(e) {
    // number in e.which is key board of the mine
    const shiftButton  = 16;
    const deleteButton = 46;
    
    switch (e.which) {
        case shiftButton:
            clickElement.click();
            break;
        case deleteButton:
            refreshElementForms();
            break;
    }
}
