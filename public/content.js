console.log('Content script loaded');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in content script:', message);

  if (message.type === 'HIGHLIGHT_TEXT') {

    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      console.log("range: ",range);
      const serializedRange = {
        startContainerXPath: getXPath(range.startContainer),
        startOffset: range.startOffset,
        endContainerXPath: getXPath(range.endContainer),
        endOffset: range.endOffset,
        text: range.toString()
      };
      console.log("serializedRange: ",serializedRange);
      const color = message.color;
      const span = document.createElement('span');
      span.className = 'highlight';
      span.style.backgroundColor = color;
      range.surroundContents(span);

      const highlightData = {
        url: window.location.href,
        serializedRange: serializedRange,
        text: selection.toString(),
        color: color,
      };
      console.log("highlightData",highlightData);

      sendResponse(highlightData);
    }
  }
});

const getXPath = (element) => {
  let xpath = '';
  for (; element && element.nodeType === 1; element = element.parentNode) {
    let id = $(element.parentNode).children(element.tagName).index(element) + 1;
    id > 1 ? (id = '[' + id + ']') : (id = '');
    xpath = '/' + element.tagName.toLowerCase() + id + xpath;
  }
  return xpath;
};
