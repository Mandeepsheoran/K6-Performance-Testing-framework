import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    noVUConnectionReuse: true,
    httpDebug: 'full',
}

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(1);
}