import tools from '../testrailwithk6/tools.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export default function handleSummary(data) {
 //   const success = CheckThresholds(data, 'iteration_duration')
 const res = data['metrics'][iteration_duration]['thresholds'] ? data['metrics'][iteration_duration]['thresholds'] : true
 const success= Object.values(res).every(obj => obj['ok'])
 //   UpdateTestrail(success, 1)
 const host = 'https://company.testrail.io'
    let status = 3 //untested

    if (success) {
        status = 1
    } else {
        status = 5
    }

    let body = {
        "results": [
            {
                "case_id": 1,
                "status_id": status,
            }
        ]
    };
    let params = { 
        headers: {
            Authorization: `Basic wrwlDV.JHDplA.yqNlJk-.ySY3jaWG6HOtzcgjfSI`,
            'content-type': 'application/json'
        }
    };

    http.post(`${host}/index.php?/api/v2/add_results_for_cases/1`,JSON.stringify(body),params);
    return {
        'logs/DataGridTest2.json': JSON.stringify(data),
        'stdout': textSummary(data, { indent: ' ', enableColors: true}),
    }
}

