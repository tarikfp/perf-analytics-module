import { PerformanceResourceTimingHandler } from "../typings";

// handlers

const convertToSec = (ms: number): number => ms / 1000;

const parseResourceTiming = (
  resourceTiming: PerformanceResourceTiming,
): PerformanceResourceTimingHandler => {
  const { duration, name, initiatorType, responseEnd, startTime } =
    resourceTiming;
  return {
    duration,
    initiatorType,
    name,
    responseEnd,
    startTime,
  };
};

// metric utils

// measure get fcp
export const getFcp = () => {
  if (typeof PerformanceObserver !== "undefined") {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        window._perfAnalytics.fcp = convertToSec(entry.startTime);
      }
    }).observe({ entryTypes: ["paint", "resource"] });
  }
};

// measure dom load
export const getDomLoad = () =>
  (window._perfAnalytics.domLoad = convertToSec(
    performance.timing.domContentLoadedEventEnd -
      performance.timing.navigationStart,
  ));

// measure window load
export const getWindowLoad = () =>
  (window._perfAnalytics.windowLoad = convertToSec(
    new Date().getTime() - performance.timing.navigationStart,
  ));

// measure ttfp =>  https://developer.mozilla.org/en-US/docs/Glossary/time_to_first_byte
export const getTTFP = () =>
  (window._perfAnalytics.ttfp = convertToSec(
    window.performance.timing.responseStart -
      window.performance.timing.navigationStart,
  ));

export const getResourceLoadTimes = () => {
  const resources = performance.getEntriesByType("resource");
  if (resources === undefined || resources.length <= 0) {
    // there are no resource performance records
    return;
  }

  for (const _resource of resources) {
    window._perfAnalytics.resources.push(
      parseResourceTiming(_resource as PerformanceResourceTiming),
    );
  }
};

export const setUserAgent = () =>
  (window._perfAnalytics.userAgent = navigator.userAgent);
