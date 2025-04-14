function applyTheme() {
    const chart = document.querySelector('iframe, .tradingview-widget-container');
    if (chart) {
        chart.style.filter = 'hue-rotate(330deg) brightness(1.2)';
        document.body.style.backgroundColor = '#ffddee';
        injectStickers();
    }
}

function removeTheme() {
    const chart = document.querySelector('iframe, .tradingview-widget-container');
    if (chart) {
        chart.style.filter = '';
        document.body.style.backgroundColor = '';
        // Remove the sticker container if it exists
        const stickerContainer = chart.parentNode.querySelector('div');
        if (stickerContainer) stickerContainer.remove();
    }
}

function injectStickers() {
    const chart = document.querySelector('iframe, .tradingview-widget-container');
    if (!chart) return;

    // Get chart dimensions
    const chartRect = chart.getBoundingClientRect();
    const stickerSize = 60; // width in pixels

    const stickerPositions = [
        { top: '15%', left: '20%' },
        { top: '40%', left: '70%' },
        { top: '60%', left: '30%' },
        { top: '25%', left: '50%' },
        { top: '75%', left: '15%' }
    ];

    // Create a container for stickers with relative positioning
    const stickerContainer = document.createElement('div');
    stickerContainer.style.position = 'absolute';
    stickerContainer.style.top = '0';
    stickerContainer.style.left = '0';
    stickerContainer.style.width = '100%';
    stickerContainer.style.height = '100%';
    stickerContainer.style.pointerEvents = 'none';
    stickerContainer.style.zIndex = 9999;

    stickerPositions.forEach(position => {
        const img = document.createElement('img');
        img.src = chrome.runtime.getURL('assets/hatsunemiku.png');
        img.style.position = 'absolute';
        img.style.top = position.top;
        img.style.left = position.left;
        img.style.width = `${stickerSize}px`;
        img.style.pointerEvents = 'none'; // Make sure stickers don't interfere with chart interaction
        stickerContainer.appendChild(img);
    });

    // Insert the container right after the chart
    chart.parentNode.insertBefore(stickerContainer, chart.nextSibling);
}

// Listen for messages and send response
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleTheme") {
        try {
            if (message.enabled) {
                applyTheme();
            } else {
                removeTheme();
            }
            sendResponse({ success: true });
        } catch (error) {
            console.log("Error applying theme:", error);
            sendResponse({ success: false, error: error.message });
        }
    }
    // Return true to indicate we will send response asynchronously
    return true;
});

// Check initial state
chrome.storage.sync.get("themeEnabled", (data) => {
    if (data.themeEnabled) {
        applyTheme();
    }
});