import http from 'k6/http';
import {sleep} from 'k6';

export const options ={
    blockHostnames: ['test.k6.io', '*.example.com', '*.atlassian.net'],
}

export default function(){
    http.get('https://ig1.atlassian.net');
    sleep(1);
}