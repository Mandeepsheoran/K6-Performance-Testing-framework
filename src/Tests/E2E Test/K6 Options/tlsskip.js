import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    insecureSkipTLSVerify: true,    /// Default value is false
}

export default function(){
    const response =http.get('https://test.k6.io/contacts.php');
    check(response, {'Status should be 200' :(res)=>res.status==200});
    sleep(1);
}