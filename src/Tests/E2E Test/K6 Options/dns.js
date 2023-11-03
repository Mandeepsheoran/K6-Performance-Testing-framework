import http from 'k6/http';
import {check, sleep} from 'k6';

export const options ={
    dns :{
        ttl: '1m',
        select: 'roundRobin',
        policy: 'any'
    },
    vus: 10,
    iterations: 100,
    duration: '2m'
};

export default function(){
        const response =http.get('https://test.k6.io/contacts.php');
        check(response, {'Status should be 200' :(res)=>res.status==200});
        sleep(1);
}