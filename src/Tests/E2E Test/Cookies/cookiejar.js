import http from 'k6/http';

export default function(){
    ///To send the cookie for subsequent requests, add it to a cookie jar. 
    ///By default, k6 has a cookie jar for each VU, which you can interact with to set and inspect cookies:
   const jar =http.cookieJar();
   jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie', 'smoke test');
   http.get('https://httpbin.test.k6.io/cookies');
}