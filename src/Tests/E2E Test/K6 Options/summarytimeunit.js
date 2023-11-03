import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    summaryTimeUnit: 'ms',
}

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}