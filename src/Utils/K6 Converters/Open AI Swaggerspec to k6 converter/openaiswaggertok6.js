import http from 'k6/http';
import { group, check, sleep } from 'k6';

const BASE_URL = 'https://httpbin.org/';
const SLEEP_DURATION = 0.1;

export default function () {
  group('/absolute-redirect/{n}', () => {
    const n = 2;
    const url = BASE_URL + `/absolute-redirect/${n}`;
    // Request No. 1
    const request = http.get(url);
    sleep(SLEEP_DURATION);
  });
}
