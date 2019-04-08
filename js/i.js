'use strict';
var allStores =[];
var hourList = ['6am','7am','8am', '9am','10','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
var ourlocation =['pike','alki','seattle','seatac','capitol'];
var form = document.getElementById('form');

function CookieStore (mincustomer, maxCustomer, avgCookieSale, location) {
  this.minCustPerHour = mincustomer;
  this.maxCustPerHour = maxCustomer;
  this.avgCookieSale = avgCookieSale;
  this.locationName = location;
  this.custEachHour = [];
  this.cookiesEachHr =[];
  this.TotalCookieForDay = 0;
  allStores.push(this);
}
allStores.push(new CookieStore ('1 st and Pike',23,65,6.3));
allStores.push(new CookieStore ('SeaTac', 3,24,1.2));
allStores.push(new CookieStore ('Seattle Center',3,24,2.3));
allStores.push(new CookieStore ('Capitol', 20,38,2.3));
allStores.push(new CookieStore ('Alki', 2,16,4.6));

// populate customer and sales per hour
function fillCustomerandSales(){
  for (var i = 0; i<allStores.length; i++){
    popCustomer(allStores[i]);
    popSales(allStores[i]);
  }
}
function popCustomer(store){
  for (var i = 0; i<allStores.length; i++){
    (store.custEachHour[i]= Math.floor(Math.random() * store.minCustPerHour+1)) + store.minCustPerHour;
  }
}
function popSales(store){
  for(var i=0; i<15;i++){
    store.cookiesEachHr[i] = Math.ceil(store.custEachHour[i]*store.avgCookieSale);
    store.TotalCookieForDay += store.cookiesEachHr[i];
  }
}
// for (var index =0; index<allStores.length; index++){
//   var id = allStores[index].locationName;
//   var ulEl =document.createElementById(id);
//   for ( var k=0; k<hourList.length; k++){
//     var liEl =document.createElement('li');
//     liEl.textContents ='Total: '+ allStores[index].TotalCookieForDay;
//     ulEl.appendChild(liEl);
//   }
// }
function header(){
  var thE1 = document.createElement('th');
  var trE1 = document.createElement('tr');
  thE1.textContent = 'storeLocations';

  trE1.appendChild(thE1);
  for (var i=0; i< allStores.length; i++){
    thE1 =document.createElement('th');
    thE1.textContent = hourList[i];
    thE1.appendChild(thE1);
  }
  thE1 =document.createElement('th');
  thE1.textContent='Daily location Totals: ';
  trE1.appendChild(thE1);
  var table = document.getElementById('tabl');
  table.appendChild(trE1);
}
header();
function body(store){
  var trE1 =document. document.createElement('tr');
  var tdE1 =document.createElement('td');
  tdE1.textContent =store.location;
  trE1.appendChild(tdE1);

  for (var j=0; j< store.cookiesEachHr.length;j++){
    tdE1 =document.createElement('td');
    tdE1.textContent = store.custEachHour[j];
    trE1.appendChild(tdE1);
  }
  tdE1 =document.createElement('td');
  tdE1.textContent = store.TotalCookieForDay;
  trE1.appendChild(tdE1);
  var table = document.getElementById('tabl');
  table.appendChild(trE1);
}
body();
function calculateEachHrLoc(trE1){
  var sum =0;
  var totalsale =0;
  var tdE1;
  for (var i=0; i<15; i++){
    sum =0;
    for(var j= 0; j<allStores.length; j++){
      sum += allStores[j].custEachHour[i];
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
  tdE1.appendChild(tdE1);
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
footer();
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
  var parent = document.getElementById('cookieform');
  var location = e.target.loc.value.toLowerCase();
  if(ourlocation.includes(location)){
    //updating one of the current locations
    for(var i =0 ; i<allStores.length; i++){
      if(allStores[i].location===e.target.loc.value){
        allStores[i].minCustPerHr = parseInt(e.target.minCust.value);
        allStores[i].maxCustPerHr = parseInt(e.target.maxCust.value);
        allStores[i].avgCookieSale = parseInt(e.target.avgCookieSale.value);
        allStores[i].totalSales=0;
      }
    }
    //clear previous table
    while(parent.hasChildNodes())
    {
      parent.removeChild(parent.firstChild);
    }
    //updating the table
    e.target.loc.value =null;
    e.target.minCus.value= null;
    e.target.maxCus.value = null;
    e.target.avgCus.value=null;

    renderAll();
  }
  //if the location submitted is a new location
  else{
    ourlocation.push(location);
    var newLocation = new CookieStore(e.target.loc.value,parseInt(e.target.minCus.value),parseInt(e.target.maxCust.value),parseInt(e.target.avgCust.value));
    allStores.push(newLocation);
    //clear previous table
    while(parent.hasChildNodes())
    {
      parent.removeChild(parent.firstChild);
    }
    e.target.loc.value =null;
    e.target.minCust.value= null;
    e.target.maxCust.value = null;
    e.target.avgCust.value=null;
    renderAll();
  }
}


function renderAll(){
  fillCustomerandSales();

  //headerRow initializer
  header();
  renderAllLoc(allStores);
  footer();
}

//Function that listen if submit button or not
form.addEventListener('submit',handleDataSubmit);
renderAll();
