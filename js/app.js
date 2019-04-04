// 'use strict';
// //Object for the location 1
var hourList = ['6am','7am','8am', '9am','10','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
// var store1 ={
// location ='1st and Pike',
// customer =[],
// min: 23,
// max: 65,
// avgCustHour: 6.3,
// customer:[],
// sales=[],
// totalSalesCookies: 0
// };
// //Object for the location 2
// var store2 ={
//   location ='SeaTac Airport',
//   customer =[],
//   min: 3,
//   max: 24,
//   avgPerHour: 1.2,
//   customer:[],
//   sales=[],
//   totalSalesCookies: 0
//   };
//   //Object for the location 3
// var store3 ={
//   location ='Seattle Center',
//   customer =[],
//   min: 11,
//   max: 38,
//   avgPerHour: 3.7,
//   customer:[],
//   sales=[],
//   totalSalesCookies: 0
//   };
//   //Object for the location 4
// var store4 ={
//   location ='Capitol Hill',
//   customer =[],
//   min: 20,
//   max: 38,
//   avgPerHour: 2.3,
//   customer:[],
//   sales=[],
//   totalSalesCookies: 0
//   };
//   //Object for the location 5
// var store5 ={
//   location ='Alki',
//   customer =[],
//   min: 2,
//   max: 16,
//   avgPerHour: 4.6,
//   customer:[],
//   sales=[],
//   totalSalesCookies: 0
// }
// var storeList=[];
// storeList.push(store1);
// storeList.push(store2);
// storeList.push(store3);
// storeList.push(store4);
// storeList.push(store5);

// //Store 

// for(var i=0; i<5; i++){
// popCustomer(store.list[i]);
// //Customer
// function popCustomer(store) {
//   for (var i=0; i<15; i++){
// store.customer[i] = Math.floor(Math.random() * (store.max -store.min)) +store.min;
//   }
// }

// popSales(storelist[i]);

// // total sales
// function popCustomer(store) {
//   for (var i=0; i<15; i++) {
//     store.sales[i] = store.customer[i]*store.avgCustHour;
//     store.totalSaleCookies += store.sales[i];
//   }
// }
// for( var index =0; index < storeList.length; index++){
//   var para =document.createElement('h1');
//   var node = document.createTextNode(storeList[index].location);
//   para.appendChild(node);
//   var element = document.getElementById('storeInfo');
//   element.appendChild(para);
//    for (var x =o; x <hourList.length; x++){
//      var olList =document.createElement('li');
//      var data = document.createTextNode (hourList[x] + storeList [index].sales[x]);
//      olList.appentChild(data);
//     document.getElementById('list').appendChild(olList);
//     }
// }
// }
'use strict'; 
var allStores =[];
function CookieStore (Mincustomer, maxCustomer, AvgCookieSale, location) { 
  this.minCustPerHour = Mincustomer;
  this.maxCustPerHour = maxCustomer;
  this.avgCookieSale = AvgCookieSale;
  this.locationName = location;
  this.custEachHour = [];
  this.cookiesEachHr =[];
  this.TotalCookieForDay = 0;
  allStores.push(this);

}
// Generation random customer per hour and putting in the array
CookieStore.prototype.randomCustomers = function (){
  for(var i=0; i<hourList.length; i++){
    this.custEachHour.push(parseInt(Math.floor(Math.random() * (this.maxCustPerHour -this.minCustPerHour)) +this.minCustPerHour));
    //console.log(this.custEachHour[i]);
  }
};
CookieStore.prototype.cookiesEachHour = function(){
  for (var i=0; i< hourList.length; i++) {
    this.cookiesEachHr[i]= Math.ceil(this.custEachHour[i]*this.avgCookieSale);
    //store.totalSaleCookies += store.sales[i];
  }
};

CookieStore.prototype.cookieGrandTotal = function(){
  console.log('this one', this.cookiesEachHr);
  for (var i=0; i<this.cookiesEachHr.length; i++){
    this.TotalCookieForDay = this.cookiesEachHr[i]+ this.TotalCookieForDay;
  // console.log('cookies for the day '+ this.TotalCookieForDay);
  }
};

var Alki =new CookieStore('2','16','4.6','Alki');
Alki.randomCustomers();
Alki.cookiesEachHour();
console.log(Alki.custEachHour);
console.log(Alki.cookiesEachHr);
var Pike =new CookieStore('2','65','6.3','1st and Pike');
Pike.randomCustomers();
Pike.cookiesEachHour();

var SeaTac =new CookieStore('3','24','1.2','SeaTac Airport');
SeaTac.randomCustomers();
SeaTac.cookiesEachHour();

var Seattle =new CookieStore('11','38','3.7','Seattle Center');
Seattle.randomCustomers();
Seattle.cookiesEachHour();

var Capitol =new CookieStore('2','16','4.6','Capitol Hill');
Capitol.randomCustomers();
Capitol.cookiesEachHour();

console.log('customer each hour is '+Alki.custEachHour);
Seattle.cookiesEachHour();
console.log('Cookie sold each hour is '+ Seattle.cookiesEachHr);
Seattle.cookieGrandTotal();
console.log('total cookies sold for the day '+ Seattle.TotalCookieForDay);

//generates the header
function headerLine(){
  var trE1 = document.createElement('tr');
  var thE1 =document.createElement ('th');
  thE1.textContent='Locations';
  trE1.appendChild(thE1);
  for(var i=0; i < hourList.length;i++){
    thE1 = document.createElement('th');
    thE1.textContent =hourList[i];
    trE1.appendChild(thE1);
  }
  thE1 = document.createElement('th');
  thE1.textContent = 'Todays Total Sales';
  trE1.appendChild(thE1);
  var table = document.getElementById('salmon');
  table.appendChild(trE1);
}

function tableData(){
  
  //tdE1.textContent= CookieStore.Location;
  
  for (var i =0; i < allStores.length; i++){
    var trE1 =document.createElement('tr');
    var tdE1 =document.createElement ('td');
    var newText = document.createTextNode(allStores[i].locationName);
    trE1.appendChild(newText);
    //trE1.appendChild(totalGrand);
    var total =0;
    // we need inner for loop that will generate populate cookie data for //each store
    for(var j = 0; j <15;j++){
      tdE1 =document.createElement('td');
      total = total+allStores[i].cookiesEachHr[j];
      tdE1.textContent=allStores[i].cookiesEachHr[j];
      //console.log(allStores[j]);
      trE1.appendChild(tdE1);
    }
    //console.log(total);
    var tdE2 = document.createElement ('td');
    tdE2.textContent = total;
    trE1.appendChild(tdE2);
    var table = document.getElementById('salmon');
    table.appendChild(trE1);
  }


  // console.log(allStores[0].cookiesEachHr[0]);
  // console.log(allStores[1].cookiesEachHr[0]);
  // console.log(allStores[2].cookiesEachHr[0]);
  // console.log(allStores[3].cookiesEachHr[0]);
  // console.log(allStores[4].cookiesEachHr[0]);


  // for(var k=0; k < hourList.length;k++){
  //   tdE1 = document.createElement('td');
  //   tdE1.textContent =Alki.cookiesEachHr[k];
  //   trE1.appendChild(tdE1);
  // }
  // trE1.textContent =('Total by Location');
  // trE1.appendChild(tdE1);
  // var table = document.getElementById('salmon');
  // table.appendChild(trE1);
}
// function totalByLocation() {
//   var sum;
//   var tdE1 = document.createElement('td');
//   var trE1 = document.createElement('tr');
//   sum = Alki.TotalCookieForDay + Seattle.TotalCookieForDay+ Pike.TotalCookieForDay+ SeaTac.TotalCookieForDay+ Capitol.TotalCookieForDay;
//   tdE1.textContent =sum;
//   trE1.appendChild(tdE1);
//   var table = document.getElementById('salmon');
//   table.appendChild(trE1);
// }

headerLine();
//totalByLocation();
tableData();
Seattle.cookiesEachHour();
console.log(Seattle.custEachHr);
// Ceate render
function renderLocations(storelist){
  for (var i=0; i < storelist; i++){
    storelist[i].render=function(){
      tableData(storelist[i]);
    };
    storelist[i].render();
  }
}

// Lab 8
// function handleSubmit (event) {
//   event.preventDefault();
//   var locationName =
