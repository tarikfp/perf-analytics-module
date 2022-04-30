const BASE_URL = "http://localhost:3001/";
export const sendMetricsWithFetch = async (data: string): Promise<Response> => {
  return fetch(BASE_URL, {
    body: data,
    method: "POST",
    headers: {
      "Content-type": "application/json;",
    },
  });
};

// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
export const sendMetricsWithBeacon = async (
  _data: string,
): Promise<boolean> => {
  // return if it ended successfully or not
  return navigator.sendBeacon(BASE_URL, _data);
};
