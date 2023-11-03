import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { vu } from 'k6/execution';


///if your use case requires using a unique data set per VU, 
///you could leverage a property called vu.idInTest.
const users = new SharedArray('users', function () {
  return JSON.parse(open('./data.json')).users;
});

export const options = {
  scenarios: {
    login: {
      executor: 'per-vu-iterations',
      vus: users.length,
      iterations: 20,
      maxDuration: '1h30m',
    },
  },
};

export default function () {
  // VU identifiers are one-based and arrays are zero-based, thus we need - 1
  console.log(`Users name: ${users[vu.idInTest - 1].username}`);
  sleep(1);
}
