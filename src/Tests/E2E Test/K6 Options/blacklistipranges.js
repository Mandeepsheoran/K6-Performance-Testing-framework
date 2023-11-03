import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    blacklistIPs: ['10.0.0.0/8'],
};

export default function(){
    http.get('https://10.0.0.0/contacts.php');
    sleep(1);
}