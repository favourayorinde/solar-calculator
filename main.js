
let appliances = {
    "Desktop" : 70,
    "LED Bulbs (Category A)" : 3,
    "LED Bulbs (Category B)" : 5,
    "LED Bulbs (Category C)" : 10,
    "LED Bulbs (Category D)" : 15,
    "LED Bulbs (Category E)" : 18,
    "LED Bulbs (Category E)" : 32,
    "Water Dispenser" : 200,
    '32" LED TV' : 40,
    '40" LED TV' : 50,
    '50" LED TV' : 70,
    '55" LED TV' : 80,
    '65" LED TV' : 100,
    '100" LED TV' : 150,
    "Standing Fan" : 50,
    "Ceiling Fan" : 75,
    "Large Refrigerator" : 300,
    "Small Rerigerator": 150,
    "Freezer" : 500,
    "1hp Pumping Machine" : 750,
    "1.5hp Pumping Machine" : 1125,
    "1hp Inverter AC" : 750,
    "1.5hp Inverter AC" : 1125,
    "Microwave": 2000,
    "Toaster": 800,
    "TV": 120,

}



const calcDisplay = document.getElementsByClassName("calculator-display");
const deleteKey = document.getElementsByClassName("delete");
let resultSection = document.querySelector(".power-results");
calcDisplay[0].style.gridTemplateColumns = "1fr";
let itemValue;

let newBtn = document.querySelector("#addBtn");
let newBtnCard = document.querySelector(".add-new-card");

let prevCards = sessionStorage.getItem("myCards");
// prevCards ? calcDisplay[0].innerHTML = prevCards : calcDisplay[0];
newBtn.addEventListener("click",cardInsert);

// this function populates the options in the dropdown list for appliances
function updateTotalLoad(){

    const totalCalc = document.querySelector(".calculator-display");
    
    totalCalc.addEventListener("click", () => {
        console.log("clicked!");
    })


}


// this function inserts new cards and sets up all the event listeners for all the buttons on each card.
function cardInsert(){
    newBtnCard.insertAdjacentHTML("beforebegin",applianceCard());
    let resultSection = document.querySelector(".get-results");

    resultSection.style.display = "block"

    changeGrid();

    deleteBtn();

    itemCounter();
    
    updateList();

    changeList();

    totalLoad();

    // console.log(storePowerRating());
}

function changeGrid(){
    calcDisplay[0].style.removeProperty("grid-template-columns")
}

function deleteBtn(){
        deleteKey[deleteKey.length-1].addEventListener("click", removeContent);
}
function removeContent(){
    this.closest('.appliance-card').remove();
    spring = storePowerRating();
    if (spring.length == 0){
        calcDisplay[0].style.gridTemplateColumns = "1fr";
    }
    totalLoad();
    resultSection.style.display = "none";

}

function storePowerRating(){
    let RatingsList = [];
    const PowerArr = document.querySelectorAll(".power-rating .value span");

    for(i=0; i<PowerArr.length;i++){
        RatingsList.push(PowerArr[i].textContent);
    }
    let PowerRating = RatingsList.map(Number);
    return PowerRating;

}

function multiplier(index, amount){
    let select = document.querySelectorAll(".select-products")[index];
    let powerVal = document.querySelectorAll(".power-rating .value span")[index];

    powerVal.textContent = +select.value * amount;
}

function itemCounter(){
    let plusIcon = document.querySelectorAll("#plus-icon");
    let minusIcon = document.querySelectorAll("#minus-icon");


    plusIcon[plusIcon.length-1].addEventListener("click", () => {
        let itemQuantity = plusIcon[plusIcon.length-1].closest(".item-quantity");
        let itemCountHTML = itemQuantity.querySelector(":scope > .item-count");
        let itemCount = +itemCountHTML.textContent;
        itemCount++;
        itemCountHTML.textContent = itemCount < 10 ? itemCount : itemCount;
        itemValue = itemCount;
        multiplier(plusIcon.length-1, itemValue);
        totalLoad();
        resultSection.style.display = "none";
    });



        minusIcon[minusIcon.length-1].addEventListener("click", () => {
            let itemQuantity = minusIcon[minusIcon.length-1].closest(".item-quantity");
            let itemCountHTML = itemQuantity.querySelector(":scope > .item-count");
            let itemCount = +itemCountHTML.textContent;
            resultSection.style.display = "none";
            if(itemCount != 1){
                    itemCount--;
                    itemCountHTML.textContent = itemCount < 10 ? itemCount : itemCount;
                    itemValue = itemCount;
                    multiplier(minusIcon.length-1, itemValue);
                    totalLoad();
                    
                }
            
        })
    
}
function updateList(){
    let applianceList = document.querySelectorAll(".select-products");

    for (let appliance in appliances) {
        applianceList[applianceList.length-1].insertAdjacentHTML("beforeend", 
        `<option value="${appliances[appliance]}">${appliance}</option>`
        );
      }

      
    }



function changeList(){
    let applianceList = document.querySelectorAll(".select-products");

    applianceList[applianceList.length-1].addEventListener("input", () =>{
        let itemQuantity = applianceList[applianceList.length-1].closest(".appliance-card");
        let itemCountHTML = itemQuantity.querySelector(".item-count");
        itemCountHTML.textContent = 1;
        let itemCount = +itemCountHTML.textContent;
        multiplier(applianceList.length-1, itemCount)
        totalLoad();
        resultSection.style.display = "none";
    })
    
}

function totalLoad() {
    let array = document.querySelectorAll(".power-rating .value span");
    let totalPower = document.querySelector("#total-power");
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += +array[i].textContent;
    }
    totalPower.textContent = total;

    return total;
  }

getResults();

function getResults(){
    let resultButton = document.querySelector(".get-results");
    resultButton.addEventListener("click", showResult);
    let panelCheck = document.querySelector("#panel-choice");
    panelCheck.addEventListener("change",showResult);
}

function showResult(){
    let inverterResult = document.querySelector("#inverter");
    let batteryResult = document.querySelector("#batteries");
    let panelResult = document.querySelector("#solar-panels");
    let bundleName = document.querySelector(".name");
    let bundlePrice = document.querySelector(".price");
    let bundleLink = document.querySelector(".product-main");
    let panelCheck = document.querySelector("#panel-choice");
    let load = totalLoad()/0.8;

    const bundles = [
      {
        name: "Basic Bundle",
        price: "₦941,000",
        panelName: "Basic Bundle with Panels",
        panelPrice: "₦1,512,000",
        inverter: "A 1.5kva inverter",
        batteries: "2 &times; 220Ah batteries",
        panels: "3 &times; 350w solar panels",
        location: "https://tubimenergy.com/products/basic-bundle?variant=44779215913272",
        minLoad: 0,
        maxLoad: 1350
      },
      {
        name: "Classic Bundle",
        price: "₦2,027,000",
        panelName: "Classic Bundle with Panels",
        panelPrice: "₦2,737,000",
        inverter: "A 3kva inverter",
        batteries: "4 &times; 220Ah batteries",
        panels: "3 &times; 450w solar panels",
        location: "https://tubimenergy.com/products/classic-bundle?variant=44779050434872",
        minLoad: 1351,
        maxLoad: 2700
      },
      {
        name: "Premium Bundle",
        price: "₦2,139,000",
        panelName: "Premium Bundle with Panels",
        panelPrice: "₦3,806,000",
        inverter: "A 4kva inverter",
        batteries: "4 &times; 220Ah batteries",
        panels: "6 &times; 540w solar panels",
        location: "https://tubimenergy.com/products/premium-bundle?variant=44779221811512",
        minLoad: 2701,
        maxLoad: 360000
      }
    ];

    function findBundle(load) {
      return bundles.find(bundle => load >= bundle.minLoad && load <= bundle.maxLoad);
    }

    let matchedBundle = findBundle(load);

    if (matchedBundle) {
      inverterResult.textContent = matchedBundle.inverter;
      batteryResult.innerHTML = matchedBundle.batteries;
      panelResult.innerHTML = matchedBundle.panels;
        if(panelCheck.checked){
            bundleName.textContent = matchedBundle.panelName;
            bundlePrice.textContent = matchedBundle.panelPrice;
        }else{
            bundleName.textContent = matchedBundle.name;
            bundlePrice.textContent = matchedBundle.price;
        }
      bundleLink.addEventListener("click",function(){
        saveSession();
        window.location.href = matchedBundle.location;
      })
    } else {
      console.log("custom solution");
    }

    resultSection.style.display = "grid";

    resultSection.scrollIntoView({behavior:"smooth", block: "center", inline: "center"});

}

function saveSession(){
    let cards = document.querySelector(".calculator-display").innerHTML;
    sessionStorage.setItem("myCards", cards);
}


function applianceCard(){
    return `
    <div class="appliance-card">
                    <div class="rating-delete">
                        <div class="power-rating">
                            <p class="label">Power rating</p>
                            <p class="value"><span>60</span>w</p>
                        </div>
                        <div class="delete">
                            <button> &times; <span>Delete</span></button>
                        </div>
                    </div>
                    <div class="item-quantity-box">
                        <div class="item-select">
                            <select name="select-item" class="select-products">
                                <option value="60">Laptop</option>
                            </select>
                        </div>
                        <div class="item-quantity">
                            <div id = "minus-icon" class="item-quantity-operation">-</div>
                            <div class="item-count">1</div>
                            <div " id="plus-icon" class="item-quantity-operation">+</div>
                        </div>
                    </div>
                </div>
    `
}

