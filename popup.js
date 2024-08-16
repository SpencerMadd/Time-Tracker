document.addEventListener('DOMContentLoaded', () => {

  //Tab Changing Button

  var buttons = document.getElementsByClassName('tab-button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', openTab);
    }


  //Stopwatch Tab Listeners
  document.getElementById('startButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startWatch' });
  });
  
  document.getElementById('stopButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopWatch' });
  });

  document.getElementById('resetButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'resetWatch' });
  });

  //Timer Tab Listeners

  document.getElementById('timeStartButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startTimer' });
  });

  document.getElementById('timeStopButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopTimer' });
  });

  document.getElementById('timeResetButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'resetTimer' });
  });

  document.getElementById('incHrButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'incHr' });
  });

  document.getElementById('decHrButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'decHr' });
  });

  document.getElementById('incMinButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'incMin' });
  });

  document.getElementById('decMinButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'decMin' });
  });

  document.getElementById('incSecButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'incSec' });
  });

  document.getElementById('decSecButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'decSec' });
  });

  //Pomodoro Listeners

  document.getElementById('startButtonPomo').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startCycle' });
  });
  
  document.getElementById('stopButtonPomo').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stopCycle' });
  });

  document.getElementById('resetButtonPomo').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'resetCycle' });
  });
  

  // Load initial state
  chrome.runtime.sendMessage({ action: 'getState' }, (response) => {
    document.getElementById('watch').textContent = response.watchTime;
    document.getElementById('timer').textContent = response.timerTime;
  });
});

// Update UI based on messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateWatchDisplay') {
    document.getElementById('watch').textContent = message.time;
  } else if (message.action === 'updateTimerDisplay') {
    document.getElementById('timer').textContent = message.time;
  } else if(message.action == 'alert'){
      alert("Time's up stinky")
  } else if(message.action === 'updatePomoDisplay'){
    document.getElementById('pomoTimer').textContent = message.time;
  }
});


function openTab(event) {
  // Get the ID of the clicked button
  var buttonId = event.target.id;
  var tabNumber = buttonId.replace('button', ''); // Extract the tab number from button ID
  
  // Hide the currently active tab
  var prevTab = document.querySelector(".tab.active");
  if (prevTab) {
      prevTab.classList.remove("active");
  }

  // Remove the active class from the previously active button
  var prevButton = document.querySelector(".tab-button.active");
  if (prevButton) {
      prevButton.classList.remove("active");
  }

  // Show the tab corresponding to the clicked button
  var newTab = document.getElementById('tab' + tabNumber);
  if (newTab) {
      newTab.classList.add("active");
  }

  // Add the active class to the clicked button
  event.target.classList.add("active");


  
}
