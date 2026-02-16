chrome.storage.local.get(["requests"]).then((result) => {
  let requestsDiv = document.getElementById("requests");

  if (!result.requests || result.requests.length === 0) {
    requestsDiv.textContent = "No requests captured yet.";
    return;
  }

  result.requests.forEach((request) => {
    let item = document.createElement("div");
    item.className = "request-item";

    let path = new URL(request.url).pathname;
    let isOk = request.statusCode >= 200 && request.statusCode < 400;

    item.innerHTML = `
      <div class="request-header">
        <span class="arrow">&#9654;</span>
        <span class="method">${request.method}</span>
        <span class="status ${isOk ? "ok" : "error"}">${request.statusCode}</span>
        <span class="url" title="${request.url}">${path}</span>
      </div>
      <div class="request-details">
        <div class="detail-row"><span class="detail-label">URL</span><span class="detail-value">${request.url}</span></div>
        <div class="detail-row"><span class="detail-label">Method</span><span class="detail-value">${request.method}</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">${request.statusLine}</span></div>
        <div class="detail-row"><span class="detail-label">Type</span><span class="detail-value">${request.type}</span></div>
        <div class="detail-row"><span class="detail-label">IP</span><span class="detail-value">${request.ip || "N/A"}</span></div>
        <div class="detail-row"><span class="detail-label">From Cache</span><span class="detail-value">${request.fromCache}</span></div>
        <div class="detail-row"><span class="detail-label">Initiator</span><span class="detail-value">${request.initiator || "N/A"}</span></div>
        <div class="detail-row"><span class="detail-label">Timestamp</span><span class="detail-value">${new Date(request.timeStamp).toLocaleString()}</span></div>
      </div>
    `;

    let header = item.querySelector(".request-header");
    let arrow = item.querySelector(".arrow");
    let details = item.querySelector(".request-details");

    header.addEventListener("click", () => {
      arrow.classList.toggle("open");
      details.classList.toggle("open");
    });

    requestsDiv.appendChild(item);

    let delimiter = document.createElement("div");
    delimiter.className = "request-delimiter";
    delimiter.textContent = "\u25BC";
    requestsDiv.appendChild(delimiter);
  });
});

document.getElementById("clear-btn").addEventListener("click", () => {
  chrome.storage.local.set({ requests: [] }).then(() => {
    document.getElementById("requests").textContent = "No requests captured yet.";
  });
});