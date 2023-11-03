import http from 'k6/http';

export default function(){
    ///This applies only to the cookie for the request in question.
    http.get('https://test-api.k6.io/public/crocodiles/1/', {
        cookies : {
            my_cookies: "smoke_test",
        },
    });
}