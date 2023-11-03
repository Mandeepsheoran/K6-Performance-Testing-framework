import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    scenarios: {
        shared_iter_scenario: {
          executor: "shared-iterations",
          vus: 10,
          iterations: 100,
          startTime: "0s",
          gracefulStop: '55s',
        },
        per_vu_scenario: {
          executor: "per-vu-iterations",
          vus: 10,
          iterations: 10,
          startTime: "10s",
          gracefulStop: '45s',
        },
        ramping_vus: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
              { duration: '20s', target: 10 },
              { duration: '10s', target: 20 },
            ],
          },
      },
}

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}