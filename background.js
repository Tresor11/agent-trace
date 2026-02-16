chrome.webRequest.onCompleted.addListener(
  function(details) {
    chrome.storage.local.get({ requests: [] }).then((result) => {
      result.requests.push(details);
      chrome.storage.local.set({ requests: result.requests });
    });
  },
  { urls: ["*://chatgpt.com/*"] }
);