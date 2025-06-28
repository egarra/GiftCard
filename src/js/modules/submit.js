import cookie from "./cookie";

function generateData(formData) {
  const siteUrl = `${window.location.origin}${window.location.pathname}`;
  const data = new FormData();
  // WordPress Ajax
  data.append("action", "forms");
  data.append("security", window.ajaxnonce);
  data.append("post", window.post);
  // Locale and Connector
  data.append("locale", window.locale);
  // Inputs
  data.append("name", formData.userName);
  data.append("phone", formData.userPhone);
  data.append("email", formData.userEmail);
  // data.append('telegram', formData.userTelegram);
  // data.append('notes', formData.userNotes);
  // Site Data
  data.append("product_name", formData.productName);
  data.append("product_id", formData.productId);
  data.append("templateVersion", window.templateVersion);
  data.append("SiteURL", siteUrl);
  data.append("website", "website");
  data.append("Projects", "GoIT");
  data.append("Potential_Category", "Course");
  data.append("Course", formData.productId);
  // data.append('Offer_Page', true);
  // Lead info
  data.append("leadActionSource", siteUrl);
  data.append("leadFormat", window.leadFormat || "marathon");
  data.append("leadIP", window.ipData?.ip || "");
  data.append("leadUserAgent", window.navigator.userAgent);
  data.append("leadFBC", cookie.getCookie("_fbc"));
  data.append("leadFBP", cookie.getCookie("_fbp"));
  data.append("google_id", cookie.readCookie("_ga"));
  // UTMs
  data.append("adId", cookie.getValue("adId"));
  data.append("adsetId", cookie.getValue("adsetId"));
  data.append("campaignId", cookie.getValue("campaignId"));
  data.append("utm_campaign", cookie.getValue("utm_campaign"));
  data.append("utm_content", cookie.getValue("utm_content"));
  data.append("utm_keyword", cookie.getValue("utm_keyword"));
  data.append("utm_medium", cookie.getValue("utm_medium"));
  data.append("utm_source", cookie.getValue("utm_source"));
  data.append("utm_term", cookie.getValue("utm_term"));
  return data;
}

function send(data) {
  // window.ajaxurl = "https://goit-connectors.place/test/";
  return fetch(window.ajaxurl, {
    method: "POST",
    body: data,
  });
}

async function logToTelegramChannel(userData, errorMessage) {
  try {
    const siteUrl = `${window.location.origin}${window.location.pathname}`;
    const data = new FormData();
    data.append("action", "logToTelegramChannel");
    data.append("security", window.ajaxnonce);
    data.append("landingUrl", siteUrl);
    data.append("errorMessage", errorMessage);
    data.append("userData", JSON.stringify(userData));
    const response = await fetch(window.ajaxurl, {
      method: "POST",
      body: data,
    });
    const responseData = await response.json();
    console.log("[logToTelegramChannel] NLS response:", responseData);
    return response;
  } catch (error) {
    console.error(`❌ Catch Error: [logToTelegramChannel] ${error}`);
  }
}

async function checkEmailDomain(email) {
  try {
    const data = new FormData();
    data.append("action", "checkemail");
    data.append("security", window.ajaxnonce);
    data.append("email", email);
    const response = await fetch(window.ajaxurl, {
      method: "POST",
      body: data,
    });
    const responseData = await response.json();
    return responseData?.success;
  } catch (error) {
    console.error(`❌ Catch Error: [checkEmailDomain] ${error}`);
    return false;
  }
}

export default {
  checkEmailDomain,
  generateData,
  logToTelegramChannel,
  send,
};
