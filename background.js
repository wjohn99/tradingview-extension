chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleTheme") {
        const isEnabled = message.enabled;
        
        chrome.tabs.query({ url: "https://app.hyperliquid.xyz/*" }, (tabs) => {
            if (tabs.length > 0) {
                tabs.forEach((tab) => {
                    try {
                        chrome.tabs.sendMessage(tab.id, { action: "toggleTheme", enabled: isEnabled }, (response) => {
                            if (chrome.runtime.lastError) {
                                console.log("Could not send message to tab:", chrome.runtime.lastError);
                            }
                        });
                    } catch (error) {
                        console.log("Error sending message to tab:", error);
                    }
                });
            }
        });
    }
    // Return true to indicate we will send response asynchronously
    return true;
});