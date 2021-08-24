
CREATE TABLE  IF NOT EXISTS departments
   ( department_id NUMBER(4) PRIMARY KEY
   , department_name VARCHAR2(30)
   , manager_id NUMBER(6)
   ) ;

--ALTER TABLE departments
--    ADD (
--   PRIMARY KEY(department_id)
--   ) ;

CREATE TABLE IF NOT EXISTS employees
   ( employee_id NUMBER(6) PRIMARY KEY
   , first_name VARCHAR2(20)
   , last_name VARCHAR2(25)
   , email VARCHAR2(25)
   , phone_number VARCHAR2(20)
   , hire_date DATE
   , salary NUMBER(8,2)
   , manager_id NUMBER(6)
   , department_id NUMBER(4)
   ) ;

--ALTER TABLE employees
--         ADD (
--   PRIMARY KEY(employee_id)
--   ) ;

INSERT INTO departments (department_id, department_name, manager_id) VALUES
  (1, 'Human Resource', 1),
  (2, 'Information Technology', 1);