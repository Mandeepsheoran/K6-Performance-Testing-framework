import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    vus: 10,
    duration: '10s'
}
export default function() {
    const url = 'https://dummyjson.com/auth/login';
    const body = JSON.stringify({
        username: "kminchelle",
        password: "0lelplR"
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    http.post(url, body, params);
    sleep(1);
    }
  