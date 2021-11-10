// Get data form
const inputElement = document.getElementById("form-validate");
const formGroupElement = inputElement.querySelectorAll(".form-control");
// Get input form
const click   = document.getElementById("js_add");
const refresh = document.getElementById("js_refresh");
const files    = document.getElementById("js_add_avatar");
// Regular expressions
const fullnameRegex = /Á|À|Ạ|Ã|Ả|Ă|Ắ|Ằ|Ẳ|Ặ|Ẵ|Â|Ấ|Ầ|Ẫ|Ẩ|Ậ|É|È|Ẽ|Ẻ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ|Ì|Í|Ĩ|Ị|Ỉ|Ò|Ó|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ộ|Ổ|Ỗ|Ơ|Ớ|Ờ|Ở|Ợ|Ỡ|Ú|Ù|Ủ|Ụ|Ũ|Ư|Ứ|Ừ|Ữ|Ử|Ự|Ý|Ỳ|Ỹ|Ỵ|Ỷ|Đ|á|à|ạ|ã|ả|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẫ|ẩ|ậ|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ể|ễ|ệ|ì|í|ĩ|ị|ỉ|ò|ó|ỏ|õ|ọ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ở|ợ|ỡ|ú|ù|ủ|ụ|ũ|ư|ứ|ừ|ữ|ử|ự|ý|ỳ|ỹ|ỵ|ỷ|đ^[a-zA-Z]+([a-zA-Z]|\s)+$/;
const emailRegex    = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex    = /((09|03|07|08|05)+([0-9]{8})\b)/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const birthdayRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

// Check validation
function checkValidation(value, input, text, regex, max, min){
    const formControl = input.parentElement;
    const textInner   = formControl.querySelector('.invalid-feedback');
    // Kiểm tra hai giá trị max, min có tồn tại hay không
    if(min){
        var textMin = `min length is ${min}`;
    }else {
        var textMin = '';
    }
    if(max){
        var textMax = `max length is ${max}`;
    }else {
        var textMax = '';
    }

    var erroMessage = input.classList.add("is-invalid");
    erroMessage += input.classList.remove("is-valid");

    if(value.trim() == ''){
        erroMessage;
        textInner.innerText = `${text} is required`;
    }else if(value.trim().length < min || value.trim().length > max) {
        erroMessage;
        textInner.innerText = `${text} ${textMin} ${textMax} characters`;
    }else if(!regex.test(value)) {
        erroMessage;
        textInner.innerText = `${text} invalid`;
    }else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        textInner.innerText = '';
    }
}

// Check confirm password
function checkConfirmPassword(password, confirmPassword) {
    const input       = inputElement.confirm_password;
    const formControl = input.parentElement;
    const textInner   = formControl.querySelector('.invalid-feedback');
    var erroPassword  = input.classList.add("is-invalid");
    erroPassword += input.classList.remove("is-valid");

    if(confirmPassword.trim() == '') {
        erroPassword;
        textInner.innerText = 'Confirm password is required';
    }else if(password !== confirmPassword) {
        erroPassword;
        textInner.innerText = 'Confirm password is Invalid';
    }else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        textInner.innerText = '';
    }
}

// Hàm reset form
function refreshForms() {
    const input       = document.getElementById("form-validate");
    const previewImg  = document.getElementById("preview-img");
    const formElement = input.querySelectorAll(".form-control");
    input.reset();
    for(var i = 0; i < formElement.length; i++){
        formElement[i].classList.remove("is-invalid");
        formElement[i].classList.remove("is-valid");
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
    resultPhone.innerText    = result.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    resultBirthday.innerText = result.birthday;

    // hiển thị ảnh trước khi upload
    if(previewImage){
        document.querySelector('.show-img-add').innerHTML = `<img src="${previewImage.src}" alt="" />`;
    }
}

// Kiểm tra value validate on click
function checkInputs(){
    const fullname       = inputElement.fullname;
    const email          = inputElement.email;
    const phone          = inputElement.phone;
    const birthday       = inputElement.birthday;
    const password       = inputElement.password;
    const confirmPassword = inputElement.confirm_password;

    // Check Validate
    checkValidation(fullname.value, fullname, "Full name", fullnameRegex, 30, 8);
    checkValidation(email.value, email, "Email", emailRegex);
    checkValidation(phone.value, phone, "Phone", phoneRegex, 10);
    checkValidation(birthday.value, birthday, "Birthday", birthdayRegex);
    checkValidation(password.value, password, "Password", passwordRegex, 30, 8);
    checkConfirmPassword(password.value, confirmPassword.value);
    

    // Add data form
    const result = {
        name: fullname.value,
        email: email.value,
        phone: phone.value,
        birthday: birthday.value,
    };
    saveForm(result);
}

// Add form
click.addEventListener('click', function(e){
    checkInputs();
});

// Reset form
refresh.addEventListener('click', function(){
    refreshForms();
});

// On input Fullname
inputElement.fullname.addEventListener('input', function(){
    const inputFullname = this;
    checkValidation(inputFullname.value, inputFullname, "Full name", fullnameRegex, 30, 8);
});

// On input Email
inputElement.email.addEventListener('input', function(){
    const inputEmail = this;
    checkValidation(inputEmail.value, inputEmail, "Email", emailRegex
)});

// On input Phone
inputElement.phone.addEventListener('input', function(){
    const inputPhone = this;
    checkValidation(inputPhone.value, inputPhone, "Phone", phoneRegex, 10)
});

// On input Birthday
inputElement.birthday.addEventListener('input', function(){
    const inputBirthday = this;
    checkValidation(inputBirthday.value, inputBirthday, "Birthday", birthdayRegex)
});

// On input Password
inputElement.password.addEventListener('input', function(){
    const inputPassword = this;
    checkValidation(inputPassword.value, inputPassword, "Password", passwordRegex, 30, 8)
});

// On input Confirm Password
inputElement.confirm_password.addEventListener('input', function(){
    checkConfirmPassword(inputElement.password.value, this.value)
});

// Ghi hoa chữ cái đầu cho full name
inputElement.fullname.addEventListener('change', function(){
    const valueString = this.value;
    const splitStr    = valueString.toLowerCase().split(" ");
    for(let i = 0; i < splitStr.length; i++){
        splitStr[i]  = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);
    }
    return this.value = splitStr.join(' ');
});

// Preview image files
files.addEventListener('click', function(){
    const inputFile     = document.getElementById('upload');
    const borderElement = document.querySelector('.preview-avatar');
    const colorElement  = document.querySelector('.avatar i');
    const showImage     = document.getElementById('show-image');
    inputFile.click();
    inputFile.addEventListener('change', function(e){
        const file = e.target.files;
        if (file.length > 0 && (file[0].type == "image/jpeg" ||
                               file[0].type == "image/png" ||
                               file[0].type == "image/jpg"))
        {
            var fileToLoad = inputFile.files[0];
            var fileReader = new FileReader();
            fileReader.onload = function(event) {
                var srcData  = event.target.result;
                borderElement.classList.remove("is-required");
                colorElement.classList.remove("is-required");
                showImage.innerHTML = `<img src="${srcData}" alt="" id="preview-img"/>`;
            }
            fileReader.readAsDataURL(fileToLoad);
        }else {
            borderElement.classList.add("is-required");
            colorElement.classList.add("is-required");
            showImage.innerHTML = '';
        }
    });
});

// Browser key
document.onkeyup = function(e){
    // số trong e.which là những ký tự trên bàn phím của mình
    const shiftButton  = 16;
    const deleteButton = 46;

    switch(e.which){
        case shiftButton:
        checkInputs();
        break;
        case deleteButton:
        refreshForm();
        break;
    }
}