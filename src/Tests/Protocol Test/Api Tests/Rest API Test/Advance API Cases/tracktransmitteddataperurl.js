import http from 'k6/http';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Two custom metrics to track data sent and received. We will tag data points added with the corresponding URL
// so we can filter these metrics down to see the data for individual URLs and set threshold across all or per-URL as well.
export const epDataSent = new Counter('endpoint_data_sent');
export const epDataRecv = new Counter('endpoint_data_recv');

export const options = {
  duration: '10s',
  vus: 10,
  thresholds: {
    // We can setup thresholds on these custom metrics, "count" means bytes in this case.
    'endpoint_data_sent': ['count < 2048'],

    // The above threshold would look at all data points added to the custom metric.
    // If we want to only consider data points for a particular URL/endpoint we can filter by URL.
    'endpoint_data_sent{url:https://test.k6.io/contacts.php}': ['count < 1024'],
    'endpoint_data_recv{url:https://test.k6.io/}': ['count < 2048'], // "count" means bytes in this case
  },
};

function sizeOfHeaders(hdrs) {
  return Object.keys(hdrs).reduce((sum, key) => sum + key.length + hdrs[key].length, 0);
}

function trackDataMetricsPerURL(res) {
  // Add data points for sent and received data
  epDataSent.add(sizeOfHeaders(res.request.headers) + res.request.body.length, {
    url: res.url,
  });
  epDataRecv.add(sizeOfHeaders(res.headers) + res.body.length, {
    url: res.url,
  });
}

export default function () {
  let res;

  res = http.get('https://test.k6.io/');
  trackDataMetricsPerURL(res);

  res = http.get('https://test.k6.io/contacts.php');
  trackDataMetricsPerURL(res);

  sleep(1);
}