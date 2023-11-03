import http from 'k6/http';
import {sleep} from 'k6';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('Content OK');
export const GaugeContentSize = new Gauge('ContentSize');
export const CounterErrors = new Counter('Errors');
export const options = {
  thresholds: {    
    'Errors': ['count<100'],                 // Count: Incorrect content cannot be returned more than 99 times.
    'ContentSize': ['value<4000'],           // Gauge: returned content must be smaller than 4000 bytes
    'Content OK': ['rate>0.95'],            // Rate: content must be OK more than 95 times
    'RTT': ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],  // Trend: Percentiles, averages, medians, and minimums must be within specified milliseconds.
  },
};

export default function () {
    const res = http.get('https://test-api.k6.io/public/crocodiles/1/');
    const contentOK = res.json('name') === 'Bert';
  
    TrendRTT.add(res.timings.duration);
    RateContentOK.add(contentOK);
    GaugeContentSize.add(res.body.length);
    CounterErrors.add(!contentOK);
  
    sleep(1);
  }