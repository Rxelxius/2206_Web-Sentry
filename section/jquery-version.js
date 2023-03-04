var version = typeof jQuery !== 'undefined' ? jQuery.fn.jquery : 'jQuery is not loaded';
window.postMessage({ type: 'jquery-version', version: version }, '*');