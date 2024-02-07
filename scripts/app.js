let userName = document.getElementById("userName");
let btnDiv = document.getElementById("btnDiv");
let getUserBtn = document.getElementById("getUserBtn");
let userInput = document.getElementById("userInput");
let searchedUsers = document.getElementById("searchedUsers");

let userArr = [];
let count = 0;
let run = false;

const GetData = async () => {
    const promise = await fetch('https://random-data-api.com/api/v2/users');
    const data = await promise.json();
    return data;
}

getUserBtn.addEventListener('click', async (event) => {
    if (run === false) {
        for (let i = 0; i < 15; i++) {
            let data = await GetData();
            userArr.push(data);
        }
        userName.textContent = userArr[count].first_name + " " + userArr[count].last_name;
        userInput.readOnly = false;
        CreatePrevBtn();
        CreateNextBtn();
    }
    run = true;
})

const CreateNextBtn = () => {
    let button = document.createElement("button");
    button.innerText = "Next";
    button.addEventListener('click', (event) => {
        if (count >= userArr.length - 1) {
            count = 0;
        } else {
            count++;
        }
        userName.textContent = userArr[count].first_name + " " + userArr[count].last_name;
    })
    btnDiv.append(button);
}

const CreatePrevBtn = () => {
    let button = document.createElement("button");
    button.innerText = "Prev";
    button.addEventListener('click', (event) => {
        if (count <= 0) {
            count = userArr.length - 1;
        } else {
            count--;
        }
        userName.textContent = userArr[count].first_name + " " + userArr[count].last_name;
    })
    btnDiv.append(button);
}

userInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        let arr = userArr.filter(user => user.subscription.status.toLowerCase() === event.target.value.toLowerCase());
        event.target.value = "";
        searchedUsers.innerHTML = "";
        if (arr.length === 0) {
            searchedUsers.textContent = "No users found :(";
        } else {
            arr.map(user => {
                let p = document.createElement("p");
                p.style = "cursor: pointer";
                p.textContent = user.first_name + " " + user.last_name;
                p.addEventListener('click', (event) => {
                    p.remove();
                })
                searchedUsers.append(p);
            });
        }
    }
})
