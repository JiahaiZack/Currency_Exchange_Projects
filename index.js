const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

// Event listener for currency dropdowns (select)
//this first creats an array of two elements, then it runs a loop iterate over the array, for each iteration, it calls an anonymous function, this function takes two parameters, select tag (fromCur & toCur);
//(condition 1) || (conditon 2); when this combined condition is true, then this var is "selected", otherwise it is an empty string;
//this method, insertADjacentHTML, add new html tag to specified condition; In this example, it adds a new <option> tag in <select> tag, because the position is 'beforeend', so new element is going to be the LAST child of <select> tag.


[fromCur, toCur].forEach((select, i) => {
    for (let curCode in Country_List) {
        const selected = (i === 0 && curCode === "USD") || (i === 1 && curCode === "GBP") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
    }
    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
});


// Function to get exchange rate from api

async function getExchangeRate() {
    const amountVal = amount.value || 1;
    exRateTxt.innerText = "Getting exchange rate...";
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/efd7a869a9ad31f2ba3ae30c/latest/${fromCur.value}`);
        const result = await response.json();   
        const exchangeRate = result.conversion_rates[toCur.value];
        const totalExRate = (amountVal * exchangeRate).toFixed(2);
        exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
    } catch (error) {
        exRateTxt.innerText = "Something went wrong...";
    }
}

// Event listeners for button and exchange icon click

window.addEventListener("load", getExchangeRate);  //.addEventListener("Event", action); 
//window is a global object in a browser's JavaScript environment. It represents the browser window; It basically targes at the entire window;
getBtn.addEventListener("click", (e) => {
    e.preventDefault(); //In many cases, buttons inside forms can trigger form submissions, leading to a page reload. Calling e.preventDefault() stops this default behavior from occurring.
    getExchangeRate();
});

exIcon.addEventListener("click", () => {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
    [fromCur, toCur].forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
    getExchangeRate();
});    



