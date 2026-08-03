let dropdowns = document.querySelectorAll("select");
let btn = document.querySelector("button");
let amount = document.querySelector("input");
// let msg = document.querySelector(".msg");//its changing the html structure
let msg = document.querySelector(".msg p");
let fromselect = document.querySelector(".from select");
let toSelect = document.querySelector(".to select");

//creating all country codes in dropdown
for (let select of dropdowns) {
    for (let currencycode in countryList) {
        let elm = document.createElement("option");
        elm.innerText = currencycode;
        elm.value = currencycode;

        //select USD to INR FIRST after reset
        if (select.name == "from" && currencycode == "USD") {
            elm.selected = true;
        }

        if (select.name == "to" && currencycode == "INR") {
            elm.selected = true;
        }

        select.append(elm);
    }

    //for changing country flag after changing country currency
    select.addEventListener("change", (evt) => {
        let parentElement = evt.target.parentElement; //get parentElement /select ka parent element select_container hai
        let img = parentElement.querySelector("img"); //select img from parent_Element ,if you select only img without parent element then ,it doest knot which element couse it has two element
        let countryCode = countryList[evt.target.value]; //get countryCode

        img.src = `https://flagsapi.com/${countryCode}/flat/64.png`; //change img src
    });
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); //stop form from reloading//it doest submit the form after clicking 

    let amt = Number(amount.value); //get amount from input and convert into number couse input always returns string ,sumtimes *, /, -, convert automaticly string into number but problem cums in + it concatinate the strings thats why we have to convert it into Number

    //check amount
    if (amount.value === "" || amt < 1) {
        amt = 1;
        amount.value = "1";
    }

    //call api
    let fromCurr = fromselect.value.toLowerCase(); //getting from currency in lowercase because API data is in lowercase
    let toCurr = toSelect.value.toLowerCase(); //getting to currency in lowercase

    let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr}.json`;

    //fetching data
    let response = await fetch(URL);
    let data = await response.json();

    //console.log(data); //you can see how json data looks, then find the specific value

    let rate = data[fromCurr][toCurr]; //getting exchange rate

    //calculations
    let finalAmount = amt * rate;

    //show result
    msg.innerText = `${amt} ${fromCurr.toUpperCase()} = ${finalAmount.toFixed(2)} ${toCurr.toUpperCase()}`;//  .toFixed(2) =>  it round of the amount to 2 decimal places
});

//show exchange rate when page loads
window.addEventListener("load", () => {
    btn.click();
});
