import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    hosts: {
        'test.k6.io':     '1.2.3.4',
        'test.k6.io:443': '1.2.3.4:8443',
        '*.grafana.com':  '1.2.3.4',
      },
}

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}