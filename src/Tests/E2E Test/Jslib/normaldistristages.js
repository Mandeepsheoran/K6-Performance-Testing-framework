    import { sleep } from 'k6';
    import exec from 'k6/execution';
    import { normalDistributionStages } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

    export const options = {
    // Change the number of VUs from 1 to 10 over a period
    // of 20 seconds comprised of 5 stages.
    stages: normalDistributionStages(10, 20, 5),
    };

    export default function () {
    console.log(exec.instance.vusActive);
    sleep(1);
    }
