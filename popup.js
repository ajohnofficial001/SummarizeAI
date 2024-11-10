document.addEventListener('DOMContentLoaded', function () {
  var analyzeButton = document.getElementById('analyzeButton');
  analyzeButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'analyzePrivacyPolicy' }, function(response) {
        // Handle the response from the content script
        console.log(response);
        
        // Display the summarized text in the 'result' element
        var resultElement = document.getElementById('result');
        if (response && response.sm_api_content) {
          resultElement.textContent = response.sm_api_content;
        } else {
          resultElement.textContent = 'Highlight the privacy policy text and click the button again';
        }
      });
    });
  });
});
