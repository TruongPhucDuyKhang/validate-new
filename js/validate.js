// Get data form
var inputElement     = document.querySelector("#form-validate");
var formGroupElement = inputElement.querySelectorAll(".form-control");
var result = [];
// Get input form
var click   = document.getElementById("js_add");
var refresh = document.getElementById("js_refresh");
var files    = document.getElementById("js_add_avatar");
// Regular expressions
var isEmail    = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var isPhone    = /((09|03|07|08|05)+([0-9]{8})\b)/;
var isPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
var isBirthday = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
function removeAscent (str) {
    if (str === null || str === undefined) return str;
    // str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }
  function isValid (string) {
    var re = /^[a-zA-Z\(^.\&*\)\(0-9!@#\$%+=./;_-]{2,}$/g; // regex here
    return re.test(removeAscent(string));
  }

//Hàm sẽ tự động ghi chữ cái in hoa đầu tiên sau mỗi dấu space
function jsUcfirst(string) {
    var splitStr = string.toLowerCase().split(" ");
    for(var i = 0; i < splitStr.length; i++){
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);
    }
    return splitStr.join(' ');
}

// Function định dạng Regular expressions
function isRegex(inputValue, regex){
    return regex.test(inputValue);
}

// Message thông báo lỗi
function erroMessage(input, message){
    const formControl     = input.parentElement;
    const text            = formControl.querySelector('.invalid-feedback');
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    text.innerText        = message;
}

// Message thông thành công
function successMessage(input, message){
    const formControl     = input.parentElement;
    const text            = formControl.querySelector('.invalid-feedback');
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    text.innerText        = message;
}

// Định dạng form phone sau khi save
function jsPhone(phonestr){
    return phonestr.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
}

// Hàm reset form
function refreshForm() {
    const previewImg = document.getElementById("preview-img");
    document.getElementById("form-validate").reset();
    for(var i = 0; i < formGroupElement.length; i++){
        formGroupElement[i].classList.remove("is-invalid");
        formGroupElement[i].classList.remove("is-valid");
    }
    document.querySelector(".invalid-feedback").innerText = '';
    if(previewImg) {
        previewImg.remove();
    }
}

// Hàm add form
function saveForm(result){
    const listInvalid    = document.querySelectorAll("input.is-invalid");
    const resultFullname = document.querySelector('.fullname');
    const resultEmail    = document.querySelector('.email');
    const resultPhone    = document.querySelector('.phone');
    const resultBirthday = document.querySelector('.birthday');
    const previewImage   = document.querySelector('#preview-img');
    if (listInvalid.length) return;
    resultFullname.innerText = result.name;
    resultEmail.innerText    = result.email;
    resultPhone.innerText    = jsPhone(result.phone);
    resultBirthday.innerText =  result.birthday;
    if(previewImage){
        document.querySelector('.show-img-add').innerHTML = `<img src="${previewImage.src}" alt="" />`;
    }
}

inputElement.fullname.addEventListener('change', function(){
    inputElement.fullname.value = jsUcfirst(inputElement.fullname.value);
});

function checkFullname(value){
    if(value.trim() == '') {
        erroMessage(inputElement.fullname, "Full name is required");
    }else if(isValid(value)) {
        erroMessage(inputElement.fullname, "Full name invalid");
    }else if(value.trim().length < 8 || value.trim().length > 30){
        erroMessage(inputElement.fullname, "Full name min length is 8 - max length is 30 characters");
    }else {
        successMessage(inputElement.fullname, '');
    }
}

function checkEmail(value, regex){
    if(value.trim() == '') {
        erroMessage(inputElement.email, "Email is required");
    }else if(!isRegex(value, isEmail)){
        erroMessage(inputElement.email, "Email invalid");
    }else {
        successMessage(inputElement.email, '');
    }
}

function checkPhone(value, regex) {
    if(value.trim() == '') {
        erroMessage(inputElement.phone, "Phone is required");
    }else if(value.trim().length > 10) {
        erroMessage(inputElement.phone, "Phone max length is 10 characters");
    }else if(!isRegex(value, isPhone)) {
        erroMessage(inputElement.phone, "Phone invalid");
    }else {
        successMessage(inputElement.phone, '');
    }
}

function checkBirthday(value, regex){
    if(value.trim() == '') {
        erroMessage(inputElement.birthday, "Birthday is required");
    }else if(!isRegex(value, isBirthday)) {
        erroMessage(inputElement.birthday, "Birthday is Invalid");
    }else {
        successMessage(inputElement.birthday, '');
    }
}

function checkPassword(value, regex) {
    if(value.trim() == '') {
        erroMessage(inputElement.password, "Password is required");
    }else if(!isRegex(value, isPassword)) {
        erroMessage(inputElement.password, "Your password must not set the character, number into the letter in uppercase");
    }else if(value.trim().length < 8 || value.trim().length > 30) {
        erroMessage(inputElement.password, "Invalid , character length between 8 - 30");
    }else {
        successMessage(inputElement.password, '');
    }
}

function checkConfirmPassword(password, confirmPassword) {
    if(confirmPassword.trim() == '') {
        erroMessage(inputElement.confirm_password, "Confirm password is required");
    }else if(password !== confirmPassword) {
        erroMessage(inputElement.confirm_password, "Confirm password is Invalid");
    }else {
        successMessage(inputElement.confirm_password, '');
    }
}

// Kiểm tra value validate on click
function checkInputs(){
    const fullnameValue       = inputElement.fullname.value;
    const emailValue          = inputElement.email.value;
    const phoneValue          = inputElement.phone.value;
    const birthdayValue       = inputElement.birthday.value;
    const passwordValue       = inputElement.password.value;
    const confirmPasswordValue = inputElement.confirm_password.value;

    // Check Validate
    checkFullname(fullnameValue);
    checkEmail(emailValue, isEmail);
    checkPhone(phoneValue, isPhone);
    checkBirthday(birthdayValue, isBirthday);
    checkPassword(passwordValue, isPassword);
    checkConfirmPassword(passwordValue, confirmPasswordValue)
    

    // Add data form
    const result = {
        name: fullnameValue,
        email: emailValue,
        phone: phoneValue,
        birthday: birthdayValue,
    };
    saveForm(result);
}

// Add form
click.addEventListener('click', function(e){
    checkInputs();
});

// Reset form
refresh.addEventListener('click', function(){
    refreshForm();
});

// On input all
inputElement.fullname.addEventListener('input', function(){checkFullname(this.value)});
inputElement.email.addEventListener('input', function(){checkEmail(this.value, isEmail)});
inputElement.phone.addEventListener('input', function(){checkPhone(this.value, isPhone)});
inputElement.birthday.addEventListener('input', function(){checkBirthday(this.value, isBirthday)});
inputElement.password.addEventListener('input', function(){checkPassword(this.value, isPassword)});
inputElement.confirm_password.addEventListener('input', function(){checkConfirmPassword(inputElement.password.value, this.value)});

// Preview image files
files.addEventListener('click', function(){
    const inputFile = document.getElementById('upload');
    inputFile.click();
    inputFile.addEventListener('change', function(e){
        // console.log(e.target);
        if (inputFile.files.length > 0) {
            var fileToLoad = inputFile.files[0];
            var fileReader = new FileReader();
            fileReader.onload = function(event) {
                var srcData  = event.target.result;
                document.getElementById('show-image').innerHTML = `<img src="${srcData}" alt="" id="preview-img"/>`;
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    });
});

// Browser key
document.onkeyup = function(e){
    switch(e.which){
        case 16:
        checkInputs();
        break;
        case 46:
        refreshForm();
        break;
    }
}