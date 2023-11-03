import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    batchPerHost: 3 ,     /// This is max call to one host website in parallel, 
                          ///Default value is 6 but here we have changed it to 3
    duration: '30s',
    iterations: 100,
    vus: 30
}

export default function(){
   const req1 ={
    method: 'GET',
    url: 'https://httpbin.test.k6.io/get',
   };

   const req2 ={
    method: 'GET',
    url: 'https://test.k6.io',
   };

   const req3 ={
    method: 'POST',
    url: 'https://httpbin.test.k6.io/post',
    body: {
        name: 'Mandeep',
    },
    params: {
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }
   };

   const response =http.batch([req1, req2, req3]);
   check(response[2], {'form data OK' : (res) => JSON.parse(res.body)['form']['name']=='Mandeep',})
    sleep(1);
}