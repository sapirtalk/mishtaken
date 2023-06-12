 //WIP

document.addEventListener("DOMContentLoaded", () => {
   const trackButton = document.getElementById("trackButton");
   trackButton.addEventListener("click", () => {
     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
       const activeTab = tabs[0];
       chrome.scripting.executeScript({
         target: { tabId: activeTab.id },
         function: trackOpenLotteriesCount
       });
     });
   });
 });


 //WIP
 