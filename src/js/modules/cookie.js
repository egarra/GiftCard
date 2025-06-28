function readCookie(cookieName) {
  const nameEQ = `${cookieName}=`;
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(nameEQ)) {
      const cidLong = trimmedCookie.substring(nameEQ.length);
      const [, , part2, part3] = cidLong.split(".");
      return `${part2}.${part3}`;
    }
  }
  return null;
}

function getCookie(cookieName) {
  const cookieParams = document.cookie
    .split("; ")
    .map((params) => params.split("="));

  const param = cookieParams.find(([param]) => param === cookieName);
  return param ? param[1] : null;
}

function setCookie(cookieName, cookieValue) {
  document.cookie = `${cookieName}=${cookieValue}; path=/`;
}

function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function saveUrlParamsToCookie() {
  const utmMarks = [
    "adId",
    "adsetId",
    "campaignId",
    "utm_campaign",
    "utm_content",
    "utm_keyword",
    "utm_medium",
    "utm_source",
    "utm_term",
  ];

  const hasUtmMark = utmMarks.some((mark) => getUrlParameter(mark));

  if (hasUtmMark) {
    utmMarks.forEach((mark) => {
      localStorage.removeItem(mark);
      deleteCookie(mark);

      const markValue = getUrlParameter(mark);
      if (markValue) {
        localStorage.setItem(mark, markValue);
        setCookie(mark, markValue);
      }
    });
  }
}

function getUrlParameter(searchParam) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(searchParam);
}

function getValue(key) {
  return getUrlParameter(key) || localStorage.getItem(key) || getCookie(key);
}

export default {
  getCookie,
  getValue,
  readCookie,
  saveUrlParamsToCookie,
};
