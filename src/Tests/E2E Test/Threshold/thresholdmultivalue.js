import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    thresholds: {
        http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],    //// 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s
      },
}

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}