    import http from 'k6/http';
    import {check, sleep} from 'k6';
    import {Trend} from 'k6/metrics';

    const trnd = new Trend('my_trend');

    export default function(){
        // Add tag to request metric data
        const response =http.get('https://test.k6.io/contacts.php', {tags :{smoke_tag : "smoke test",},});

        // Add tag to check
        check(response, {"status should be 200": (r) => r.status === 200}, {smoke_tag : "smoke test"});

        // Add tag to custom metric
        trnd.add(response.timings.connecting, {smoke_tag :"smoke test"});
    }