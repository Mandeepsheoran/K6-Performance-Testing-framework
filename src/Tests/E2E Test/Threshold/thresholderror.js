import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    thresholds: {
        http_req_failed: ['rate<0.01'], /// http errors should be less than 1%
        http_req_duration: ['p(95)<200'], /// 95% of requests should be below 200ms
      },
}

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}