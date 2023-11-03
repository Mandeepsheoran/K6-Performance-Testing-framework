import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    thresholds: {
        'http_req_duration': ['avg<100', 'p(95)<200'],
        'http_req_connecting{cdnAsset:true}': ['p(95)<100'],
      },
}

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}