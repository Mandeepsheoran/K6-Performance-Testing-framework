import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';

///It is often a requirement not to use the same data more than once in a test. With the help of k6/execution, 
///which includes a property scenario.iterationInTest, you can retrieve unique rows from your data set.

///scenario.iterationInTest property is unique per scenario, not the overall test. That means if you have multiple scenarios in your test you might need to split your data per scenario.
const data = new SharedArray('users', function () {
  return JSON.parse(open('./data.json')).users;
});

export const options = {
  scenarios: {
    'use-all-the-data': {
      executor: 'shared-iterations',
      vus: 10,
      iterations: data.length,
      maxDuration: '1h',
    },
  },
};

export default function () {
  // this is unique even in the cloud
  const user = data[scenario.iterationInTest];
  console.log(`user: ${JSON.stringify(user)}`);
}
