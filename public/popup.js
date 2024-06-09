document.addEventListener('DOMContentLoaded', () => {
  const highlightBtn = document.getElementById('highlightBtn');
  const highlightColorInput = document.getElementById('highlightColor');
  const backendUrl = 'http://localhost:4000/api/v1/highlight/saveHighlight';

  highlightBtn.addEventListener('click', () => {
    const color = highlightColorInput.value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => window.getSelection().toString(),
      }, (results) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
        }

        const selectedText = results[0].result;

        chrome.tabs.sendMessage(tabs[0].id, { type: 'HIGHLIGHT_TEXT', color, text: selectedText}, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error sending message to content script:', chrome.runtime.lastError.message);
            return;
          }

          if (!response) {
            console.error('No response from content script');
            return;
          }

          if (response.error) {
            console.error('Error from content script:', response.error);
            return;
          }

          fetch(`${backendUrl}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(response)
          }).then(res => res.json())
            .then(data => console.log('Highlight saved:', data))
            .catch(error => console.error('Error saving highlight:', error));
        });
      });
    });
  });
});
