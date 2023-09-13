"use strict";
var form = document.getElementById("form");
var table = document.getElementById("table");
var p = document.getElementById("total");
var head = ["Device Name", "Quentity", "Unit Price", "Device Category"];

function tableHead() {
  var tr = document.createElement("tr");
  table.appendChild(tr);
  for (var index = 0; index < head.length; index++) {
    var th = document.createElement("th");
    th.textContent = head[index];

    tr.appendChild(th);
  }
}
var allDevice = [];
var totalPrice = 0;

if (localStorage.getItem("Devices")) {
  var array = JSON.parse(localStorage.getItem("Devices"));

  for (var index = 0; index < array.length; index++) {
    new Device(array[index].name, array[index].category, array[index].quantity);
  }
}

function Device(name, category, quentity) {
  this.name = name;
  this.category = category;
  this.quentity = quentity;
  this.random = [];
}

Device.prototype.generateRandomDevicePrice = function () {
  var rand = Math.floor(350 + Math.random() * (750 - 350));
  this.random.push(rand);
};

Device.prototype.render = function () {
  var tr1 = document.createElement("tr");
  table.appendChild(tr1);
  var td = document.createElement("td");

  td.textContent = this.name;
  tr1.appendChild(td);

  var td1 = document.createElement("td");
  td1.textContent = this.quentity;
  tr1.appendChild(td1);

  var td2 = document.createElement("td");
  td2.textContent = this.random;
  tr1.appendChild(td2);

  var td3 = document.createElement("td");
  td3.textContent = this.category;
  tr1.appendChild(td3);
};

form.addEventListener("submit", addDevice);

function addDevice(event) {
  event.preventDefault();

  var name = event.target.deviceName.value;
  var category = event.target.deviceCategory.value;
  var quentity = event.target.quantity.value;

  var newDevice = new Device(name, category, quentity);
  allDevice.push(newDevice);

  newDevice.generateRandomDevicePrice();
  newDevice.render();
  totalOfPrice();

  localStorage.setItem("Devices", JSON.stringify(allDevice));
  form.reset();
}

tableHead();

function totalOfPrice() {
  for (var index = 0; index < allDevice.length; index++) {
    totalPrice += allDevice[index].random * allDevice[index].quentity;
    console.log(
      allDevice[index].quentity +
        "/" +
        allDevice[index].random +
        "/" +
        totalPrice
    );
  }

  console.log(Number(totalPrice));
  console.log("====================================");
  p.textContent = "Total =  " + Number(totalPrice);
}

for (var i = 0; i < allDevice.length; i++) {
  allDevice[i].generateRandomDevicePrice();
  allDevice[i].render();
}
totalOfPrice();
