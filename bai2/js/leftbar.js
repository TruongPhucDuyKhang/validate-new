const selectCity = document.querySelector(".select-city");
//New branch
selectCity.addEventListener('change', function(e) {
    const listGroup = document.querySelectorAll(".list-group-item");
    const selected = this.value;
    //Auto clear khi click select qua number khác
    listGroup.forEach(city => city.classList.remove("active"));

    if (selected == "" || selected == "reset") return;

    for (let i = 0; i < listGroup.length; i++) {
        if (selected == "even") {
            if (i % 2 !== 0) {
                listGroup[i].classList.add("active");
            }
        } else if (selected == "odd") {
            if (i % 2 === 0) {
                listGroup[i].classList.add("active");
            }
        } else {
            //selected - 1 là để so sanh cho giống index trong vòng lập for == nhau
            listGroup[selected - 1].classList.add("active");
        }
    }
});
