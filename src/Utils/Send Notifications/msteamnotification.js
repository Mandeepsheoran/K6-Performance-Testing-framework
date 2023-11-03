import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    // fail the test if 95th percentile response goes above 500ms
    http_req_duration: ['p(95)<500'],
  },
  // Increase teardown function timeout as MS Teams API seems to be slower than >10s
  teardownTimeout: '60s',
};

export default function () {
  http.get('https://test.k6.io/');
  sleep(5.0);
}

export function teardown(data) {
  const event = {
    text: 'My test just finished! See the reports on Grafana dashboard.',
  };
  const res = http.post('msteamswebhookurl', JSON.stringify(event), {
    headers: { 'Content-Type': 'application/json' },
  });
}
