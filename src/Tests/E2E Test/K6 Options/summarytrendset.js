import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(95)', 'p(99)', 'p(99.99)', 'count'],
}

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}