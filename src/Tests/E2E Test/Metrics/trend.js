import http from 'k6/http';
import {Trend} from 'k6/metrics';

const trend = new Trend("my_trend");

export default function(){
    const res=http.get("https://test.k6.io/contacts.php");
 trend.add(res.timings.duration);
 console.log(trend.name);
}