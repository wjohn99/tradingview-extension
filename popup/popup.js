const toggleSwitch = document.getElementById("theme-toggle");

// Load initial state
chrome.storage.sync.get("themeEnabled", (data) => {
    toggleSwitch.checked = data.themeEnabled || false;
});

toggleSwitch.addEventListener("change", async () => {
    const isEnabled = toggleSwitch.checked;
    
    try {
        // Save state first
        await chrome.storage.sync.set({ themeEnabled: isEnabled });
        
        // Send message to background script
        chrome.runtime.sendMessage({ action: "toggleTheme", enabled: isEnabled }, (response) => {
            if (chrome.runtime.lastError) {
                console.log("Error sending message:", chrome.runtime.lastError);
                return;
            }
        });
    } catch (error) {
        console.log("Error toggling theme:", error);
    }
});