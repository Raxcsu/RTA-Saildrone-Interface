let currentProgress1 = document.getElementById('current1'),
    currentProgress2 = document.getElementById('current2'),
    batteryProgress = document.querySelector(".battery-progress");

let batteryStartValue = 100,    
    batteryEndValue = 20,    
    batterySpeed = 200,
    currentStartValue1 = 2,
    currentStartValue2 = 2,
    currentMin = 2,
    currentMax = 12,
    currentSpeed = 100;

async function get_current() {

    currentStartValue1 = currentStartValue1 + (Math.random()*1.6 - Math.random()*1.5);
    currentStartValue2 = currentStartValue2 + (Math.random()*1.6 - Math.random()*1.5);

    if(currentStartValue1 < currentMin){
        currentStartValue1 = currentMin;
    }

    if(currentStartValue2 < currentMin){
        currentStartValue2 = currentMin;
    }

    //currentValue1.textContent = 
    document.getElementById('motor1').textContent = `${currentStartValue1.toFixed(2)}A`;
    currentProgress1.style.background = `conic-gradient(#A7A9AD ${currentStartValue1 * 18}deg, #DBDDE3 0deg)`

    document.getElementById('motor2').textContent = `${currentStartValue2.toFixed(2)}A`;
    currentProgress2.style.background = `conic-gradient(#A7A9AD ${currentStartValue2 * 18}deg, #DBDDE3 0deg)`

    if(currentStartValue1 > currentMax){
        currentStartValue1 = currentMax;
    }

    if(currentStartValue2 > currentMax){
        currentStartValue2 = currentMax;
    }
}

async function get_battery(){
    batteryStartValue = batteryStartValue - Math.random()*1.6;

    document.getElementById('battery').textContent = `${batteryStartValue.toFixed(2)}%`;
    //batteryValue.textContent = `${batteryStartValue}%`
    batteryProgress.style.background = `conic-gradient(#A7A9AD ${batteryStartValue * 3.6}deg, #DBDDE3 0deg)`

    if(batteryStartValue < batteryEndValue){
        batteryStartValue = batteryEndValue;
    }
}

setInterval(get_battery, batterySpeed);    
setInterval(get_current, currentSpeed);