const socket = io();

let currentProgress1 = document.getElementById('current1'),
    currentProgress2 = document.getElementById('current2'),
    batteryProgress = document.querySelector(".battery-progress");

// Making a map and tiles
// Setting a higher initial zoom to make effect more obvious
const mymap = L.map('rtaMap').setView([0, 0], 13);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl = 'https://api.mapbox.com/styles/v1/raxcso/cllbaofvn011401mf4u0bbygx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmF4Y3NvIiwiYSI6ImNsa3VpNWl6OTBqaW4zZnJ1MndleTA2dWgifQ.vozU5m_2BWE1jFdbHvxPCg';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Making a marker with a custom icon
const SaildroneIcon = L.icon({
    iconUrl: './img/saildrone.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

let marker = L.marker([0, 0], { icon: SaildroneIcon }).addTo(mymap);

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