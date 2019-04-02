'use strict';
//Object for the location 1
var days = ['6am','7am','8am', '9am','10','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
var store1 ={
location ='1st and Pike',
customer =[],
min: 23,
max: 65,
avgCustHour: 6.3,
customer:[],
sales=[],
totalSalesCookies: 0
};
//Object for the location 2
var store2 ={
  location ='SeaTac Airport',
  customer =[],
  min: 3,
  max: 24,
  avgPerHour: 1.2,
  customer:[],
  sales=[],
  totalSalesCookies: 0
  };
  //Object for the location 3
var store3 ={
  location ='Seattle Center',
  customer =[],
  min: 11,
  max: 38,
  avgPerHour: 3.7,
  customer:[],
  sales=[],
  totalSalesCookies: 0
  };
  //Object for the location 4
var store4 ={
  location ='Capitol Hill',
  customer =[],
  min: 20,
  max: 38,
  avgPerHour: 2.3,
  customer:[],
  sales=[],
  totalSalesCookies: 0
  };
  //Object for the location 5
var store5 ={
  location ='Alki',
  customer =[],
  min: 2,
  max: 16,
  avgPerHour: 4.6,
  customer:[],
  sales=[],
  totalSalesCookies: 0
}
var storeList=[];
storeList.push(store1);
storeList.push(store2);
storeList.push(store3);
storeList.push(store4);
storeList.push(store5);

//Store 

for(var i=0; i<5; i++){
popCustomer(store.list[i]);
//Customer
function popCustomer(store) {
  for (var i=0; i<15; i++){
store.customer[i] = Math.floor(Math.random() * (store.max -store.min)) +store.min;
  }
}

popSales(storelist[i]);

// total sales
function popCustomer(store) {
  for (var i=0; i<15; i++) {
    store.sales[i] = store.customer[i]*store.avgCustHour;
    store.totalSaleCookies += store.sales[i];
  }
}
for( var index =0; index < storeList.length; index++){
  var para =document.createElement('h1');
  var node = document.createTextNode(storeList[index].location);
  para.appendChild(node);
  var element = document.getElementById('storeInfo');
  element.appendChild(para);
   for (var x =o; x <hourList.length; x++){
     var olList =document.createElement('li');
     var data = document.createTextNode (hourList[x] + storeList [index].sales[x]);
     olList.appentChild(data);
    document.getElementById('list').appendChild(olList);
    }
}
}
