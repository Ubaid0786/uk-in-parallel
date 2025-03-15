// Script to check if resources are accessible
document.addEventListener('DOMContentLoaded', function() {
  console.log('Resource checker loaded');
  
  // Create debug container if it doesn't exist
  let debugStatus = document.getElementById('debug-status');
  if (!debugStatus) {
    debugStatus = document.createElement('div');
    debugStatus.id = 'debug-status';
    debugStatus.style.position = 'fixed';
    debugStatus.style.bottom = '0';
    debugStatus.style.right = '0';
    debugStatus.style.background = 'white';
    debugStatus.style.color = 'black';
    debugStatus.style.padding = '5px';
    debugStatus.style.fontSize = '12px';
    debugStatus.style.zIndex = '10000';
    document.body.appendChild(debugStatus);
  }
  
  // Check CSS
  const cssPath = '/src/frontend/css/styles.css';
  fetch(cssPath)
    .then(response => {
      if (response.ok) {
        console.log('CSS file accessible:', cssPath);
        debugStatus.innerHTML += `<div style="color:green">CSS: ✓ (${cssPath})</div>`;
      } else {
        console.error('CSS file not accessible:', cssPath, response.status);
        debugStatus.innerHTML += `<div style="color:red">CSS: ✗ (${cssPath}) - Status: ${response.status}</div>`;
      }
    })
    .catch(error => {
      console.error('Error fetching CSS:', error);
      debugStatus.innerHTML += `<div style="color:red">CSS: ✗ (${cssPath}) - Error: ${error.message}</div>`;
    });
  
  // Check JS
  const jsPath = '/src/frontend/js/script.js';
  fetch(jsPath)
    .then(response => {
      if (response.ok) {
        console.log('JS file accessible:', jsPath);
        debugStatus.innerHTML += `<div style="color:green">JS: ✓ (${jsPath})</div>`;
      } else {
        console.error('JS file not accessible:', jsPath, response.status);
        debugStatus.innerHTML += `<div style="color:red">JS: ✗ (${jsPath}) - Status: ${response.status}</div>`;
      }
    })
    .catch(error => {
      console.error('Error fetching JS:', error);
      debugStatus.innerHTML += `<div style="color:red">JS: ✗ (${jsPath}) - Error: ${error.message}</div>`;
    });
  
  // Check if functions are available
  setTimeout(() => {
    if (typeof window.showRoastingAssistant === 'function') {
      debugStatus.innerHTML += `<div style="color:green">Function: showRoastingAssistant ✓</div>`;
    } else {
      debugStatus.innerHTML += `<div style="color:red">Function: showRoastingAssistant ✗</div>`;
    }
  }, 2000);
}); 