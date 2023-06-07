chrome.runtime.onInstalled.addListener(() => {
   console.log('Extension installed');
 });
 
 let previousCount = 0;


function showNotification(message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'home-button.png',
    title: 'עדכון חדש!',
    message: message
  });

  chrome.notifications.onClicked.addListener(function() {
    chrome.tabs.create({ url: 'https://www.dira.moch.gov.il/ProjectsList' });
  }
  );


}



 function trackOpenLotteriesCount() {
   fetch("https://www.dira.moch.gov.il/api/Invoker?method=Projects&param=%3FfirstApplicantIdentityNumber%3D%26secondApplicantIdentityNumber%3D%26ProjectStatus%3D4%26Entitlement%3D1%26PageNumber%3D1%26PageSize%3D50%26IsInit%3Dtrue%26", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "https://www.dira.moch.gov.il/ProjectsList",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
   }).then(response => {
       if (!response.ok) {
         throw new Error("Request failed with status code " + response.status);
       }
       return response.json();
     })
     .then(data => {
       console.log(data); // Handle the response data
        const openLotteriesCount = data['OpenLotteriesCount'];
        if (openLotteriesCount > previousCount) {
          const newLotteriesCount = openLotteriesCount - previousCount;
          showNotification("יש " + newLotteriesCount  + "  הגרלות חדשות ! לפרטים נוספים לחץ כאן");
        }
        previousCount = openLotteriesCount;
     })
     .catch(error => {
       console.error(error); // Handle any errors
     });
 }
 

 // call the function every hour
 function startworking(){

  trackOpenLotteriesCount();

  
  setInterval(trackOpenLotteriesCount, 1000*60*60);
  
 }

 


  startworking();