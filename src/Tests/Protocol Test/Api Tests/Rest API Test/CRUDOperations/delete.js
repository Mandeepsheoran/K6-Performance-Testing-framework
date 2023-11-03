import http from 'k6/http';
import {sleep} from 'k6';

export default function(){
    const url = 'https://httpbin.test.k6.io/delete';

    const params= {
        header :{
            'X-MyHeader': 'k6test'
        }
    }

    http.del(url, null, params);
}