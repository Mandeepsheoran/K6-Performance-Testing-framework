import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

export const options ={
    vus: 30,
    duration: '2m',
    thresholds: {
      http_req_duration: [{ 
        threshold: 'p(99) < 10', 
        abortOnFail: true ,
        delayAbortEval: '10s',
    }],
    },
}

export default function(){
    http.get('https://test-api.k6.io/public/crocodiles/1/');
}