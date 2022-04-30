import { IPerfAnalytics } from "./typings";

export {};

declare global {
  interface Window {
    _perfAnalytics: IPerfAnalytics;
  }
}
