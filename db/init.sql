CREATE TYPE user_role AS ENUM (
  'CUSTOMER',
  'TECHNICIAN',
  'ADMIN'
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'CUSTOMER'
);

CREATE TYPE request_status AS ENUM (
  'NEW',
  'ASSIGNED',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED'
);

CREATE TYPE appliance_type AS ENUM (
  'REFRIGERATOR',
  'WASHING_MACHINE',
  'DISHWASHER',
  'DRYER',
  'OVEN',
  'FREEZER'
);

CREATE TABLE service_requests (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  appliance_type appliance_type NOT NULL,
  brand VARCHAR(100),
  model VARCHAR(100),
  status request_status NOT NULL DEFAULT 'NEW',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  customer_id INTEGER NOT NULL REFERENCES users(id),
  technician_id INTEGER REFERENCES users(id)
);