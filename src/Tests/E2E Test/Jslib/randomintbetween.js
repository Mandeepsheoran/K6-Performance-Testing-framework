import { check,sleep } from "k6";
import { randomIntBetween, randomItem } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";

export const options = {
  "duration": "10s",
  "vus": 1
};

export default function() {
  console.log(randomItem([1,2,3,4]));
  sleep(randomIntBetween(1,5)); // sleep between 1 and 5 seconds
}