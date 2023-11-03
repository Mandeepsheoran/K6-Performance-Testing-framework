import ws from 'k6/ws';
import {check} from 'k6';

export const options = {
    vus: 5,
    duration: '30s'
}

export default function(){
    const url = 'wss://dev.azure.digitaltwin.aero/api-service/eventstream/v1/YYZ';
    const param = {tags : {my_tag : "my tag"}};

    ws.connect(url, param, function(Socket){
        Socket.on('open', () => console.log('connected'));
        Socket.on('message', (data) =>  console.log('Message received :', data));
        Socket.on('close', () => console.log('disconnected'));
    });

    check(res, { 'status is 101': (r) => r && r.status === 101 });
}