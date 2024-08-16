let timerInterval;
let stopwatchInterval;
let pomoInterval;
let timerRunning = false;
let watchRunning = false;
let pomoRunning = false;
let pomoBreak = false;
let secondS = 0;
let minuteS = 0;
let hourS = 0;
let secondT = 0;
let minuteT = 0;
let hourT = 0;
let secondP = 0;
let minuteP = 25;
let hourP = 0;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getState') {
    sendResponse({
      watchTime: formatTime(hourS, minuteS, secondS),
      timerTime: formatTime(hourT, minuteT, secondT)
    });
  } else if (message.action === 'startWatch') {
    startWatch();
  } else if (message.action === 'stopWatch') {
    stopWatch();
  } else if (message.action === 'resetWatch') {
    resetWatch();
  } else if (message.action === 'startTimer') {
    startTimer();
  } else if (message.action === 'stopTimer') {
    stopTimer();
  } else if (message.action === 'resetTimer') {
    resetTimer();
  } else if (message.action === 'incHr') {
    incHr();
  } else if (message.action === 'decHr') {
    decHr();
  } else if (message.action === 'incMin') {
    incMin();
  } else if (message.action === 'decMin') {
    decMin();
  } else if (message.action === 'incSec') {
    incSec();
  } else if (message.action === 'decSec') {
    decSec();
  } else if (message.action === 'startCycle') {
    pomoStart();
  } else if (message.action === 'stopCycle') {
    pomoStop();
  } else if (message.action === 'resetCycle') {
    pomoReset();
  }
});

function pomoStart(){
  if(!pomoRunning){
    pomoInterval = setInterval(updatePomo, 1000)
    pomoRunning = true;
  }
}
function pomoStop(){
  clearInterval(pomoInterval);
  pomoRunning = false;
  updatePomoDisplay();
}

function pomoReset(){
  clearInterval(pomoInterval);
  pomoRunning = false;
  secondP = 25;
  minuteP = 0;
  hourP = 0;
  updatePomoDisplay();
}

function updatePomo(){
  if (secondP == 0 && minuteP == 0) {
    endAlert();
    console.log(pomoBreak);
    if(!pomoBreak){
      secondP = 0;
      minuteP = 5;
      hourP = 0;
      pomoBreak = true;
    } else{
      secondP = 0;
      minuteP = 25;
      hourP = 0;
      pomoBreak = false;
    }
  } else {
    if (secondP === 0) {
      if (minuteP === 0) {
        endAlert();
      } else {
        minuteP--;
        secondP = 59;
      }
    } else {
      secondP--;
    }
    updatePomoDisplay();
  }
}

function updatePomoDisplay(){
  const formattedTime = formatTime(hourP, minuteP, secondP);
  chrome.runtime.sendMessage({ action: 'updatePomoDisplay', time: formattedTime });
}

function startWatch() {
  if (!watchRunning) {
    stopwatchInterval = setInterval(updateWatch, 1000);
    watchRunning = true;
  }
}

function stopWatch() {
  clearInterval(stopwatchInterval);
  watchRunning = false;
  updateWatchDisplay();
}

function resetWatch() {
  clearInterval(stopwatchInterval);
  watchRunning = false;
  secondS = 0;
  minuteS = 0;
  hourS = 0;
  updateWatchDisplay();
}

function updateWatch() {
  secondS++;
  if (secondS >= 60) {
    secondS = 0;
    minuteS++;
    if (minuteS >= 60) {
      minuteS = 0;
      hourS++;
    }
  }
  updateWatchDisplay();
}

function updateWatchDisplay() {
  const formattedTime = formatTime(hourS, minuteS, secondS);
  chrome.runtime.sendMessage({ action: 'updateWatchDisplay', time: formattedTime });
}

function startTimer() {
  if (!timerRunning) {
    timerInterval = setInterval(updateTimer, 1000);
    timerRunning = true;
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  updateTimerDisplay();
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  secondT = 0;
  minuteT = 0;
  hourT = 0;
  updateTimerDisplay();
}

function updateTimer() {
  if (secondT == 0 && minuteT == 0 && hourT == 0) {
    stopTimer();
    endAlert();
  } else {
    if (secondT === 0) {
      if (minuteT === 0) {
        if (hourT > 0) {
          hourT--;
          minuteT = 59;
          secondT = 59;
        }
      } else {
        minuteT--;
        secondT = 59;
      }
    } else {
      secondT--;
    }
    updateTimerDisplay();
  }
}

function incHr() {
  console.log("Hours?");
  hourT++;
  updateTimerDisplay();
}

function decHr() {
  if (hourT > 0) {
    hourT--;
    updateTimerDisplay();
  }
}

function incMin() {
    console.log("minute works");
    minuteT++;
    updateTimerDisplay();
  }
  
  function decMin() {
    if (minuteT > 0) {
        minuteT--;
        updateTimerDisplay();
    }
  }

  function incSec() {
    console.log("second works");
    secondT++;
    updateTimerDisplay();
  }
  
  function decSec() {
    if (secondT > 0) {
        secondT--;
        updateTimerDisplay();
    }
  }

function updateTimerDisplay() {
  const formattedTime = formatTime(hourT, minuteT, secondT);
  chrome.runtime.sendMessage({ action: 'updateTimerDisplay', time: formattedTime });
}

function formatTime(hours, minutes, seconds) {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function endAlert(){
    chrome.runtime.sendMessage({ action: 'alert'});
}
