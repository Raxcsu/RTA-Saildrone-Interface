/*
let batteryStartValue = 100,    
    batteryEndValue = 20,    
    batterySpeed = 200,
    currentStartValue1 = 2,
    currentStartValue2 = 2,
    currentMin = 2,
    currentMax = 12,
    currentSpeed = 100,
    data = 1;

async function get_current() {

    currentStartValue1 = currentStartValue1 + (Math.random()*1.6 - Math.random()*1.5);
    currentStartValue2 = currentStartValue2 + (Math.random()*1.6 - Math.random()*1.5);

    if(currentStartValue1 < currentMin){currentStartValue1 = currentMin;}
    if(currentStartValue2 < currentMin){currentStartValue2 = currentMin;}

    document.getElementById('motor1').textContent = `${currentStartValue1.toFixed(2)}A`;
    currentProgress1.style.background = `conic-gradient(#A7A9AD ${currentStartValue1 * 18}deg, #DBDDE3 0deg)`

    document.getElementById('motor2').textContent = `${currentStartValue2.toFixed(2)}A`;
    currentProgress2.style.background = `conic-gradient(#A7A9AD ${currentStartValue2 * 18}deg, #DBDDE3 0deg)`

    if(currentStartValue1 > currentMax){currentStartValue1 = currentMax;}
    if(currentStartValue2 > currentMax){currentStartValue2 = currentMax;}
}

async function get_battery(){
    batteryStartValue = batteryStartValue - Math.random()*1.6;

    document.getElementById('battery').textContent = `${batteryStartValue.toFixed(2)}%`;
    batteryProgress.style.background = `conic-gradient(#A7A9AD ${batteryStartValue * 3.6}deg, #DBDDE3 0deg)`

    if(batteryStartValue < batteryEndValue){batteryStartValue = batteryEndValue;}
}*/

//setInterval(get_battery, batterySpeed);    
//setInterval(get_current, currentSpeed);

const socket = io();

let currentProgress1 = document.getElementById('current1'),
    currentProgress2 = document.getElementById('current2'),
    batteryProgress = document.querySelector(".battery-progress");

// Making a map and tiles
// Setting a higher initial zoom to make effect more obvious
const mymap = L.map('rtaMap').setView([0, 0], 8);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Making a marker with a custom icon
const issIcon = L.icon({
    iconUrl: './img/saildrone.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

let marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTime = true;

socket.on('arduino', function(data){
    console.log(data);

    let TempValue = document.getElementById('Temp');
    TempValue.innerHTML = `${data.Temp} °C`;

    let LatiValue = document.getElementById('Lati');
    LatiValue.innerHTML = `${data.Lati} °`;

    let LongValue = document.getElementById('Long');
    LongValue.innerHTML = `${data.Long} °`;

    let BateValue = document.getElementById('Bate');
    BateValue.innerHTML = `${data.Bate}%`;
    batteryProgress.style.background = `conic-gradient(#A7A9AD ${data.Bate * 3.6}deg, #DBDDE3 0deg)`

    let Amp1Value = document.getElementById('Amp1');
    Amp1Value.innerHTML = `${data.Amp1}A`;
    currentProgress1.style.background = `conic-gradient(#A7A9AD ${data.Amp1 * 18}deg, #DBDDE3 0deg)`

    let Amp2Value = document.getElementById('Amp2');
    Amp2Value.innerHTML = `${data.Amp2}A`;
    currentProgress2.style.background = `conic-gradient(#A7A9AD ${data.Amp2 * 18}deg, #DBDDE3 0deg)`

    // Always set the view to current lat lon and zoom!
    mymap.setView([data.Lati, data.Long], mymap.getZoom());
    marker.setLatLng([data.Lati, data.Long]);
});



/*
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;

    // Always set the view to current lat lon and zoom!
    mymap.setView([latitude, longitude], mymap.getZoom());
    marker.setLatLng([latitude, longitude]);

    //document.getElementById('lat').textContent = latitude.toFixed(2);
    //document.getElementById('lon').textContent = longitude.toFixed(2);
}

getISS();
setInterval(getISS, 1000);
*/