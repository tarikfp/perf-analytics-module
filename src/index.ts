import { sendMetricsWithFetch } from "./utils/api";
import {
  convertToSec,
  getDomLoad,
  getFcp,
  getResourceLoadTimes,
  getTTFB,
  getWindowLoad,
  setLocationHref,
  setUserAgent,
} from "./utils/metrics";

// using declared object in global window object
// @see window.d.ts
window._perfAnalytics = {
  domLoad: 0,
  fcp: 0,
  ttfb: 0,
  windowLoad: 0,
  userAgent: null,
  url: null,
  resources: [],
};

// check whether performance apis are supported
// terminate the module in case of not supported
const isPerformanceAPISupported = () => {
  if (
    !window.performance ||
    !window.performance.timing ||
    !window.performance.getEntriesByType
  ) {
    throw new Error(
      "Performance api is not supported in this specific browser...",
    );
  }
};

function initializeObservers() {
  getDomLoad();
  getWindowLoad();
  getTTFB();
  getResourceLoadTimes();
  setUserAgent();
  setLocationHref();
}

(function init() {
  // check whether performance apis are supported
  isPerformanceAPISupported();

  // initialize metric observers on window load...
  window.addEventListener("load", async () => {
    const fcpEntry = await getFcp();

    window._perfAnalytics.fcp = convertToSec(fcpEntry?.startTime ?? 0);

    initializeObservers();
    // send metric data to api

    // facing CORB issue while using navigator.sendBeacon API
    // will prefer to use fetchAPI instead
    // @see https://medium.com/@longtermsec/chrome-just-hardened-the-navigator-beacon-api-against-cross-site-request-forgery-csrf-690239ccccf
    return sendMetricsWithFetch(JSON.stringify(window._perfAnalytics));
    // check whether sendBeacon is available
    /*   if (!navigator.sendBeacon) {
      // use fetch api
      sendMetricsWithFetch(JSON.stringify(window._perfAnalytics));
    } else {
      sendMetricsWithBeacon(JSON.stringify(window._perfAnalytics));
    } */
  });
})();
