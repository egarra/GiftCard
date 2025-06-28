function setUrlParameter(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, document.title, url.href);
}

function setLeelooData(formData) {
  const fields = {
    name: "first_name",
    phone: "phone",
    email: "email",
    product_name: "zoho_product_name",
    product_id: "zoho_product_id",
    adId: "adid",
    adsetId: "adsetid",
    campaignId: "campaignid",
    utm_campaign: "utm_campaign",
    utm_content: "utm_content",
    utm_keyword: "utm_keyword",
    utm_medium: "utm_medium",
    utm_source: "utm_source",
    utm_term: "utm_term",
    google_id: "ga",
  };

  Object.entries(fields).forEach(([key, value]) => {
    const formValue = formData.get(key);
    if (formValue && formValue !== "undefined" && formValue !== "null") {
      setUrlParameter(value, formValue);
    }
  });
}

function initializeLeeloo(form, leelooHash = window.leelooHash) {
  const leeloo = document.createElement("div");
  leeloo.className = "leeloo";
  leeloo.style.display = "none";
  leeloo.innerHTML = `<div class="wepster-hash-${leelooHash}"></div>`;

  form.parentNode.appendChild(leeloo);

  window.LEELOO = function () {
    window.LEELOO_INIT = { id: "5d0cb9cdaad9f4000e4b8e07" };
    var js = document.createElement("script");
    js.src = "https://app.leeloo.ai/init.js";
    js.async = true;
    document.getElementsByTagName("head")[0].appendChild(js);
  };
  LEELOO();
  window.LEELOO_LEADGENTOOLS = (window.LEELOO_LEADGENTOOLS || []).concat(
    leelooHash,
  );

  leeloo.style.display = "block";
}

export default function showLeeloo(form, data) {
  setLeelooData(data);
  setUrlParameter("name2", data.get("name"));
  setUrlParameter("template_version", window.templateVersion);
  initializeLeeloo(form);
}
