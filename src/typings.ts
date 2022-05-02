// Typings for object which will be attached and stored in global scope
// they can be undefined in case browser does not support global performance api
export interface IPerfAnalytics {
  // time to first byte
  ttfb?: number;
  // first contentful paint
  fcp?: number;
  // dom load time
  // corresponds to DOMContentLoaded event
  // it does not wait for stylesheet, image etc..
  // see https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
  domLoad?: number;
  // window load
  windowLoad?: number;
  // resources... document, img etc...
  resources: PerformanceResourceTimingHandler[];
  // user agent
  userAgent: string | null;
  // url of the page
  url: string | null;
}
export type PerformanceResourceTimingHandler = Pick<
  PerformanceResourceTiming,
  | "name"
  | "responseEnd"
  | "initiatorType"
  | "startTime"
  | "duration"
  | "transferSize"
>;
