import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    discardResponseBodies : true,
}

export default function(){
    const response=http.get('https://test.k6.io/contacts.php');
    console.log(response);
    sleep(1);
}