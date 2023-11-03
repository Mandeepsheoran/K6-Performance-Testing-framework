import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    stages: [
        { duration: '3m', target: 10 },
        { duration: '5m', target: 10 },
        { duration: '10m', target: 35 },
        { duration: '3m', target: 0 },
      ],
}
// The following config would have k6 ramping up from 1 to 10 VUs for 3 minutes,
// then staying flat at 10 VUs for 5 minutes, then ramping up from 10 to 35 VUs
// over the next 10 minutes before finally ramping down to 0 VUs for another
// 3 minutes.

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}