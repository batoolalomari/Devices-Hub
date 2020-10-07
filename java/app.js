'use strict';
var form=document.getElementById('form');
var table=document.getElementById('table');

var head=["Device Name","Quentity","Unit Price","Device Category"];

function tableHead(){
    var tr=document.createElement('tr');
table.appendChild(tr);
    for (var index = 0; index < head.length; index++) {
       var th=document.createElement('th');
       th.textContent=head[index];

       tr.appendChild(th);
        
    }
}
var allDevice=[];
var totalPrice=0;

if(localStorage.getItem('Devices'))
{
    var array=JSON.parse(localStorage.getItem('Devices'));

    for (var index = 0; index < array.length; index++) {
       new Device(array[index].name,array[index].category,array[index].quantity);
        
    }
}

function Device(name , category , quentity)
{
    this.name=name;
    this.category=category;
    this.quentity=quentity;
    this.random=[];

}

Device.prototype.generateRandomDevicePrice=function()
{

    var rand=Math.floor(350+Math.random()*(750-350));
    totalPrice+=rand;
    this.random.push(rand);

};


Device.prototype.render=function(){

    var tr1=document.createElement('tr');
    var td=document.createElement('td');
  
    td.textContent=this.name;
    tr1.appendChild(td);

    var tr2=document.createElement('tr');
    
    var td1=document.createElement('td');
    td1.textContent=this.quentity;
    tr2.appendChild(td1);

    var tr3=document.createElement('tr');
  
   var td2=document.createElement('td');
    td2.textContent=this.random;
    tr3.appendChild(td2);


    var tr4=document.createElement('tr');
  
   var td3=document.createElement('td');
    td3.textContent=this.category;
    tr4.appendChild(td3);




};

/*var newDevice=new Device('Iphone','mobile','1');
newDevice.generateRandomDevicePrice();
newDevice.render();*/

form.addEventListener('submit',addDevice);

function addDevice(event){
    event.preventDefault();

    var name=event.target.deviceName.value;
    var category=event.target.deviceCategory.value;
    var quentity=event.target.quantity.value;

    var newDevice=new Device(name,category,quentity);
    allDevice.push(newDevice);

    newDevice.generateRandomDevicePrice();
    newDevice.render();

    localStorage.setItem('Devices',JSON.stringify(allDevice));

}



tableHead();

for (var index = 0; index < allDevice.length; index++) {
    document.getElementById('total').textContent=Number(totalPrice);
}

for (var i = 0; i < allDevice.length; i++) {
    allDevice[i].generateRandomDevicePrice();
   allDevice[i].render();
}
