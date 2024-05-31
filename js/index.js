siteNameInput = document.getElementById("siteName");
siteUrlInput = document.getElementById("siteUrl");
var siteInfo = [];

// console.log(localStorage.getItem("allSites"));

if (JSON.parse(localStorage.getItem("allSites"))) {

    siteInfo = JSON.parse(localStorage.getItem("allSites"));
    displaySite();
}

function addSite() {

    if (validateInput(siteNameInput) && validateInput(siteUrlInput)){
        var site = {
            name: siteNameInput.value,
            url: siteUrlInput.value,
        };
        siteInfo.push(site);
        localStorage.setItem("allSites", JSON.stringify(siteInfo))
        // localStorage.setItem("allSites", siteInfo)
        console.log(siteInfo);
        clearForm()
        displaySite()
    }
}

function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function displaySite() {
    var bBox = '';
    for (var i = 0; i < siteInfo.length; i++) {
        bBox += `<tr>
            <td>${i}</td>
            <td>${siteInfo[i].name}</td>
            <td>
                <a class="btn visit-btn" href="${siteInfo[i].url}" target="_blank">
                    <i class="fa-solid fa-eye pe-2"></i>
                    Visit
                </a>
            </td>
            <td class="p-2">
            <button class="btn btn-danger" onclick="deleteSite(${i})">
            <i class="fa-solid fa-trash-can pe-2" ></i>
            Delete
        </button>
            </td>
        </tr>`;

    }
    document.getElementById("table-body").innerHTML = bBox;
}

function deleteSite(deletedIndex) {
    siteInfo.splice(deletedIndex, 1);
    // console.log(siteInfo);
    localStorage.setItem("allSites", JSON.stringify(siteInfo));
    displaySite()
}

function visitSite(vistedUrl) {
    siteUrlInput.value = siteInfo[vistedUrl].url;
}



function validateInput(ele) {
    console.log(ele.id, ele.value);
    // console.log(ele);

    var regex = {
        siteName: /^[A-Za-z]{3,10}$/,
        siteUrl: /^(https?|http):\/\/[^\s\/$.?#][^\s]*$/,
        // siteUrl: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    };

    
    var isValid = regex[ele.id].test(ele.value);

    if (isValid){
        console.log("Matched");
        // ele.classList.replace("is-invalid", "is-valid");
        if (ele.classList.contains("is-invalid")){
            ele.classList.replace("is-invalid", "is-valid")
        } else {
            ele.classList.add("is-valid");
        }
        ele.nextElementSibling.classList.replace("d-block", "d-none")

    } else {
        console.log("Not Matched");
        // ele.classList.add("is-invalid");
        if (ele.classList.contains("is-valid")){
            ele.classList.replace("is-valid", "is-invalid")
        } else {
            ele.classList.add("is-invalid");
        }
        ele.nextElementSibling.classList.replace("d-none", "d-block")
    
    }

    return isValid
    // var isValid = regex.test(siteNameInput.value)

    
    
}