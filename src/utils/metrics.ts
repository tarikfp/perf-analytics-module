import { PerformanceResourceTimingHandler } from "../typings";

// handlers

export const convertToSec = (ms: number): number => ms / 1000;

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
export const getFcp = async (): Promise<PerformanceEntry | undefined> => {
  return new Promise((resolve, reject) => {
    if (typeof PerformanceObserver !== "undefined") {
      new PerformanceObserver((entryList) => {
        const foundFCP = entryList
          .getEntriesByType("paint")
          .find((entry) => entry.name === "first-contentful-paint");
        if (foundFCP) {
          resolve(foundFCP);
        } else {
          return resolve(undefined);
        }
      }).observe({ type: "paint", buffered: true });
    } else {
      reject("PerformanceObserver is unavailable");
    }
  });
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
