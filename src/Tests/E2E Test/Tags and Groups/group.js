import { group } from 'k6';
import http from 'k6/http';

export default function () {
  group('visit product listing page', function () {
   http.get("https://test.k6.io/contacts.php");
  });
  group('add several products to the shopping cart', function () {
    http.get("https://test.k6.io/news.php");
  });
  group('visit login page', function () {
    http.get("https://test.k6.io/pi.php?decimals=3"); 
  });
}
