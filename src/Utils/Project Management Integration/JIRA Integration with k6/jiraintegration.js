import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const expectedStatusCode = 205; // Replace with the expected status code
  const apiUrl = 'https://reqres.in/api/users?page=2'; // Replace with the API URL

  const response = http.get(apiUrl);

  // Check if the response status code is not 201 (Created)
  if (response.status !== expectedStatusCode) {
    createJiraIssue(apiUrl, expectedStatusCode, response.status, response.body);
  }

  // Optional: Sleep to simulate user wait time before making the next request
  sleep(3);
}

export function createJiraIssue(apiUrl, expectedStatusCode, responseStatus, responseBody) {
  const jiraBaseUrl = 'https://ig1.atlassian.net/';
  const jiraUsername = 'mandeep.sheoran@igtsolutions.com';
  const jiraApiToken = 'ATATT3xFfGF0Qx2CPRb4C_SIIKFVQBtSWNsHWKeotqQHNCVvPr0nYTXJ5g8F6FKCtJrqpLRPRhy9xTaM82EpEQ_M8xS61zxlOU-JqwCNQ5q0KEK4SG_3xbT6gUCIuZgn00-gbfjO9QypKYx9BmDX35J7ZCVCOXVb1ye6NO-7cvoIm7EOMK3Zxn0=BA229F09';

  const issueData = {
    fields: {
      project: {
        key: 'AIR' // Replace with your Jira project key
      },
      summary: 'API Response Error',
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: `The API request to '${apiUrl}' returned status ${responseStatus} instead of the expected ${expectedStatusCode}, and the response body is: ${responseBody}`,
              },
            ],
          },
        ],
      },
      issuetype: {
        name: 'Bug' // Replace with the issue type (e.g., Bug, Task, Story, etc.)
      },
    },
  };

  const resp = http.post(`${jiraBaseUrl}/issue`, JSON.stringify(issueData), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ATATT3xFfGF0Qx2CPRb4C_SIIKFVQBtSWNsHWKeotqQHNCVvPr0nYTXJ5g8F6FKCtJrqpLRPRhy9xTaM82EpEQ_M8xS61zxlOU-JqwCNQ5q0KEK4SG_3xbT6gUCIuZgn00-gbfjO9QypKYx9BmDX35J7ZCVCOXVb1ye6NO-7cvoIm7EOMK3Zxn0=BA229F09'
    },
  });
  console.log(`Response status code: ${resp.status}`);
 // console.log(`Response body: ${resp.body}`);
}