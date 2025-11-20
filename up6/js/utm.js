// UTM Handler - Captura e encaminha UTMs
function getUTMs() {
  const params = new URLSearchParams(window.location.search);
  const utms = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'click_id'].forEach(param => {
    const value = params.get(param);
    if (value) {
      utms[param] = value;
      // Salva no sessionStorage para persistir
      sessionStorage.setItem(param, value);
    } else {
      // Tenta recuperar do sessionStorage
      const saved = sessionStorage.getItem(param);
      if (saved) utms[param] = saved;
    }
  });
  
  return utms;
}

function addUTMToURL(url, utms) {
  const urlObj = new URL(url);
  Object.keys(utms).forEach(key => {
    urlObj.searchParams.set(key, utms[key]);
  });
  return urlObj.toString();
}

function redirectToCheckout(checkoutId) {
  let checkoutURL = `https://checkout.pagamentos-raspa.shop/payment/checkout/${checkoutId}`;
  const utms = getUTMs();
  checkoutURL = addUTMToURL(checkoutURL, utms);
  window.location.href = checkoutURL;
}
