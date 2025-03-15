// CSS Loader Script
document.addEventListener('DOMContentLoaded', function() {
  console.log('CSS Loader initialized');
  
  // Function to check if a stylesheet is loaded
  function isStylesheetLoaded(href) {
    for (let i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].href && document.styleSheets[i].href.includes(href)) {
        return true;
      }
    }
    return false;
  }
  
  // Function to load a stylesheet
  function loadStylesheet(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    console.log('Dynamically loaded stylesheet:', href);
    return link;
  }
  
  // Check if the main stylesheet is loaded
  setTimeout(function() {
    if (!isStylesheetLoaded('styles.css')) {
      console.warn('Main stylesheet not loaded, attempting to load fallback');
      
      // Try to load the main stylesheet again
      const mainStylesheet = loadStylesheet('/src/frontend/css/styles.css');
      
      // If that fails, load the inline styles
      mainStylesheet.onerror = function() {
        console.warn('Failed to load main stylesheet, loading inline styles');
        loadStylesheet('/inline-styles.css');
      };
    }
  }, 1000);
}); 