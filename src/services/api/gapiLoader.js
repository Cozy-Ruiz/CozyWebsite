export function loadGapiScript() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
  
      script.onload = () => {
        window.gapi.load('client:auth2', resolve);
      };
  
      document.body.appendChild(script);
    });
}