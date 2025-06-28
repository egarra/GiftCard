async function getIpInfo() {
  try {
    const response = await fetch("https://ipwho.is/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ [getIpInfo] ${error}`);
    return null;
  }
}

function uid() {
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default {
  getIpInfo,
  uid,
};
