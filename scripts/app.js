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
    if(run === false){
        for(let i = 0; i < 15; i++){
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
        if(count >= userArr.length - 1){
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
        if(count <= 0){
            count = userArr.length - 1;
        } else {
           count--; 
        }
        userName.textContent = userArr[count].first_name + " " + userArr[count].last_name;
    })
    btnDiv.append(button);
}


