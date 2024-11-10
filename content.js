import key from ".env";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'analyzePrivacyPolicy') {
        //var privacyPolicyElement = document.querySelector('#privacy-policy');
        var privacyPolicyText = window.getSelection().toString();
        if (privacyPolicyText) {
            // const valuetouse = '7C026F519B';
            
            fetch(`https://api.smmry.com?SM_API_KEY=${key}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Expect': ''
              },
              body: `sm_api_input=${encodeURIComponent(privacyPolicyText)}`
            })
            .then(response => response.json())
            .then(data => {
              // You might want to send the data back to the popup script or use it in some other way
              console.log(data);
              sendResponse(data);
            })
            .catch(error => console.error('Error:', error));
        } else {
            console.error('Could not find privacy policy element');
        }
    }
    return true;  // Will respond asynchronously.
});

