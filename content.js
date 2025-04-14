const waitForChart = setInterval(() => {
    const chart = document.querySelector('iframe, .tradingview-widget-container');
    if (chart) {
      chart.style.filter = 'hue-rotate(330deg) brightness(1.2)';
      document.body.style.backgroundColor = '#ffddee';
      injectStickers();
      clearInterval(waitForChart);
    }
}, 500);
  
function injectStickers() {
    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('assets/hello-kitty.png');
    img.style.position = 'fixed';
    img.style.top = '40px';
    img.style.right = '20px';
    img.style.zIndex = 9999;
    img.style.width = '60px';
    document.body.appendChild(img);
}