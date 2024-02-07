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
            userArr.push(data.first_name + " " + data.last_name);
        } 
        userName.textContent = userArr[count];
        userInput.readOnly = false;
    }
})

