import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    tlsAuth: [
        {
          domains: ['example.com'],
          cert: open('mycert.pem'),
          key: open('mycert-key.pem'),
          password: 'mycert-passphrase',
        },
      ],
}

export default function(){
    const response =http.get('https://test.k6.io/contacts.php');
    check(response, {'Status should be 200' :(res)=>res.status==200});
    sleep(1);
}