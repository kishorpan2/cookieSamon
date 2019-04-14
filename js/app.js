'use strict';
var allStores =[];
var hourList = ['6am','7am','8am', '9am','10','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

function CookieStore (location, mincustomer, maxCustomer, avgCookieSale) {
  this.minCustPerHour = mincustomer;
  this.maxCustPerHour = maxCustomer;
  this.avgCookieSale = avgCookieSale;
  this.locationName = location;
  this.custEachHour = [];
  this.cookiesEachHr =[];
  this.TotalCookieForDay = 0;
  allStores.push(this);
}
new CookieStore ('1 st and Pike',23,65,6.3);
new CookieStore ('SeaTac', 3,24,1.2);
new CookieStore ('Seattle Center',3,24,2.3);
new CookieStore ('Capitol', 20,38,2.3);
new CookieStore ('Alki', 2,16,4.6);

// populate customer and sales per hour
function fillCustomerandSales(){
  for (var i = 0; i<allStores.length; i++){
    popCustomer(allStores[i]);
    popSales(allStores[i]);
  }
}
function popCustomer(store){
  for (var i = 0; i<hourList.length; i++){
    (store.custEachHour[i]= Math.floor(Math.random() * (store.maxCustPerHour - store.minCustPerHour+1)) + store.minCustPerHour);
  }
}
function popSales(store){
  console.log('total cookie',store.TotalCookieForDay);
  for(var i=0; i<hourList.length;i++){
    store.cookiesEachHr[i] = Math.ceil(store.custEachHour[i]*store.avgCookieSale);
    store.TotalCookieForDay += store.cookiesEachHr[i];
  }
}
//create a header for the table
function header(){
  var thE1 = document.createElement('th');
  var trE1 = document.createElement('tr');
  thE1.textContent = 'Store Locations';
  trE1.appendChild(thE1);

  for (var i = 0; i < hourList.length; i++){
    thE1 = document.createElement('th');
    thE1.textContent = hourList[i];
    trE1.appendChild(thE1);
  }
  thE1 = document.createElement('th');
  thE1.textContent ='Daily location Totals: ';
  trE1.appendChild(thE1);
  var salesTable = document.getElementById('tabl');
  salesTable.appendChild(trE1);
}

function body(store){
  var trE1 = document.createElement('tr');
  var tdE1 = document.createElement('td');
  tdE1.textContent = store.locationName;
  trE1.appendChild(tdE1);

  for (var j=0; j< store.cookiesEachHr.length;j++){
    tdE1 =document.createElement('td');
    tdE1.textContent = store.cookiesEachHr[j];
    trE1.appendChild(tdE1);
  }
  tdE1 =document.createElement('td');
  tdE1.textContent = store.TotalCookieForDay;
  trE1.appendChild(tdE1);
  var table = document.getElementById('tabl');
  table.appendChild(trE1);
}

function calculateEachHrLoc(trE1){
  var sum =0;
  var totalsale =0;
  var tdE1;
  for (var i=0; i<15; i++){
    sum =0;
    for(var j= 0; j<allStores.length; j++){
      sum += allStores[j].cookiesEachHr[i];
    }
    tdE1 =document.createElement('td');
    tdE1.textContent =sum;
    trE1.appendChild(tdE1);
  }
  tdE1 =document.createElement('td');
  for (var index =0; index < allStores.length; index++){
    totalsale += allStores[index].TotalCookieForDay;
  }
  tdE1.textContent =totalsale;
  trE1.appendChild(tdE1);
}
function footer(){
  var trE1 = document.createElement('tr');
  var tdE1 = document.createElement('td');
  tdE1.textContent = 'Daily Total';
  trE1.appendChild(tdE1);

  calculateEachHrLoc(trE1);
  var table = document.getElementById('tabl');
  table.appendChild(trE1);
}
//To generate render for each location and calling render for each object

function renderAllLoc(allStores){
  for(var i = 0 ; i < allStores.length;i++){
    allStores[i].render = function(){
      body(allStores[i]);
    };
    allStores[i].render();
  }
}
//Function that handles the submit event

function handleDataSubmit(e){
  // prevents page reload on a 'submit' event
  e.preventDefault();
  //previous table
  console.log(e);
  var parent = document.getElementById('tabl');
 
  var formLocation = e.target[1].value.toLowerCase();
  var formMin = parseInt(e.target[2].value);
  var formMax = parseInt(e.target[3].value);
  var formAvg = parseInt(e.target[4].value);
  var newStore = new CookieStore (formLocation, formMin,formMax, formAvg); 
  popCustomer(newStore); 
  //popSales(newStore);
  console.log(newStore);
  
  //clear previous table
  while(parent.hasChildNodes())
  {
    parent.removeChild(parent.firstChild);
  }

  renderAll();
}


function renderAll(){
  fillCustomerandSales();

  //headerRow initializer
  header();
  renderAllLoc(allStores);
  footer();
}
var cookieform = document.getElementById('cookieform');
//Function that listen if submit button or not
cookieform.addEventListener('submit',handleDataSubmit);
renderAll();
