import http from 'k6/http';
import {Trend} from 'k6/metrics';

const my_trend = new Trend("serverTimeOnDTLogin");

export const options = {
    vus: 5,
    duration:'10s',
    threashold : {
        serverTimeOnDTLogin : ['p(90)<300'],
    }
}

export default function(){
    const res=http.post('https://dev-ui.azure.digitaltwin.aero/login',
    {
        username:'pp@gmail.com',
        password: 'Hallo@123'
    }
    );
    my_trend.add(res.timings.sending);
    console.log(my_trend.name);
}