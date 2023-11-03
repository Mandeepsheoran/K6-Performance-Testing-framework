import sql from 'k6/x/sql';
import { check } from 'k6';

const db = sql.open('sqlite3', './test.db');

export function setup() {
  db.exec(`CREATE TABLE IF NOT EXISTS person (
           id integer PRIMARY KEY AUTOINCREMENT,
           email varchar NOT NULL,
           first_name varchar,
           last_name varchar);`);

  db.exec(
    "INSERT INTO person (email, first_name, last_name) VALUES('johndoe@email.com', 'John', 'Doe');"
  );
  db.exec(
    "INSERT INTO person (email, first_name, last_name) VALUES('marysue@email.com', 'Mary', 'Sue');"
  );
  db.exec(
    "INSERT INTO person (email, first_name, last_name) VALUES('dorydoe@email.com', 'Dory', 'Doe');"
  );
}

export function teardown() {
  db.exec('DELETE FROM person;');
  db.exec('DROP TABLE person;');
  db.close();
}

export default function () {
  const results = sql.query(db, 'SELECT * FROM person;');
  check(results, {
    'is length 3': (r) => r.length === 3,
  });
}
