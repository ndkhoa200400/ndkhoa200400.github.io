import Config from "./config";

declare global {
  interface Window {
    ZGS: any;
  }
}

export function login(): Promise<void> {
  if (window.location.href.includes("localhost")) {
    window.ZGS = {};
    // window.ZGS.getZgsk = () =>
    //   "oNIn.120126539.1206.Ihay_vGkJO9RD6M54CXDWXhqKPhBWQoD49uiSNB8JO8";
    window.ZGS.getZgsk = () =>
      "21l_.120126539.1236.R8417ydxQPf-B42TDT1ecZ_EEDVkcOcLDJBTOrVGQ9e";

    localStorage.setItem("zgsk", window.ZGS.getZgsk());
    return new Promise((resolve: any, reject) => {
      setTimeout(() => {
        document.body.dispatchEvent(new Event("user_login"));
        resolve();
      }, 500);
    });
  } else {
    window.ZGS.initialize(Config);
    return new Promise((resolve: any, reject) => {
      window.ZGS.loginZalo().then(() => {
        localStorage.setItem("zgsk", window.ZGS.getZgsk());
        document.body.dispatchEvent(new Event("user_login"));
        resolve();
      });
    });
  }
}
