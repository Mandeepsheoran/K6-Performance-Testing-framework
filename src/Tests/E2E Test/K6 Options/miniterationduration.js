import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    minIterationDuration: '10s',    ///Default value is 10
}

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}