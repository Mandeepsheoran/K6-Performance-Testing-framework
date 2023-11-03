import http from 'k6/http';
import {check, sleep} from 'k6';

export const options ={
    vus: 10,
    duration: '10s'
}

export default function(){
    const response =http.get('https://test.k6.io/contacts.php');
    check(response, {'Status should be 200' :(res)=>res.status==200});
    sleep(1);
}
