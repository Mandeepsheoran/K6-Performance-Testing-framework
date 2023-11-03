export function CheckThresholds(data, metric) {
    const res = data['metrics'][metric]['thresholds'] ? data['metrics'][metric]['thresholds'] : true
    return Object.values(res).every(obj => obj['ok'])
}

export function UpdateTestrail(success, caseId) {
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
                "case_id": caseId,
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
}