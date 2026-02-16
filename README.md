# AgentTrace

A Chrome extension that intercepts AI API calls, letting you inspect and debug agent conversations in the browser.

## What It Does

![AgentTrace Screenshot](screenshot.png)

- Intercepts network requests to ChatGPT (`chatgpt.com`)
- Displays request method, status code, and URL path
- Expandable detail view for each request (IP, cache status, timestamp, and more)
- Clear button to reset captured data

## Example

Send a single message in ChatGPT and AgentTrace reveals the **15+ API calls** happening behind the scenes — preparation, security checks, telemetry, the actual AI call, and post-processing metrics.

## Install

1. Clone this repo
   ```bash
   git clone https://github.com/Tresor11/agent-trace.git
   ```
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top right)
4. Click **Load unpacked** and select the cloned folder

## How It Works

- **background.js** — Service worker that listens for completed network requests to `chatgpt.com` using the `chrome.webRequest` API, and stores them in `chrome.storage.local`
- **popup.js** — Reads captured requests from storage and renders them as collapsible list items
- **popup.html / popup.css** — Dark-themed UI with status indicators and expandable request details

## Roadmap

- [ ] Capture request/response bodies
- [ ] Visualize agent loops (plan → act → observe)
- [ ] Support more AI providers (Anthropic, Gemini, etc.)
- [ ] Modify and replay requests
- [ ] Export conversation threads for analysis

## Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

## License

[MIT](LICENSE)
