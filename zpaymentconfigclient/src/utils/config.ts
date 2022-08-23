const dev =
  window.location.href.includes("dev") ||
  window.location.href.includes("localhost");
const appIdDev = "353770040957925373";
const appIdLive = "353770040957925373";
export const Config = {
  REDIRECT_URL: dev
    ? "https://dev-zpayconfig.zingplay.me/"
    : "https://zpayconfig.zingplay.me/",
  APP_ID: dev ? appIdDev : appIdLive,
  API: dev
    ? "https://dev-zpayconfig.zingplay.me/zapi/"
    : "https://zpayconfig.zingplay.me/zapi/",
  API_DATA: dev
    ? "http://dev-content.zagoo.vn:9218/api"
    : "https://api-content.zagoo.vn/api",
  ZALO_SDK_SCRIPT: "https://zagoo.zadn.vn/sdk/zalosdk.22.01.22.js",
  isDev: dev,
};

export default Config;
