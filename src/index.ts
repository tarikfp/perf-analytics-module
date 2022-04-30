import { sendMetricsWithBeacon, sendMetricsWithFetch } from "./utils/api";
import {
  convertToSec,
  getDomLoad,
  getFcp,
  getResourceLoadTimes,
  getTTFP,
  getWindowLoad,
  setUserAgent,
} from "./utils/metrics";

// using declared object in global window object
// @see window.d.ts
window._perfAnalytics = {
  domLoad: 0,
  fcp: 0,
  ttfp: 0,
  windowLoad: 0,
  userAgent: null,
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
  getTTFP();
  getResourceLoadTimes();
  setUserAgent();
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

    // check whether sendBeacon is available
    if (!navigator.sendBeacon) {
      // use fetch api
      sendMetricsWithFetch(JSON.stringify(window._perfAnalytics));
    } else {
      sendMetricsWithBeacon(JSON.stringify(window._perfAnalytics));
    }
  });
})();
