Create a postgres database with 2 tables named 'employees' and 'department'. Create the tables using the following commands: <br />
For table 'departments' :<br /> 
  CREATE TABLE departments( <br />
     dept_id integer primary key, <br />
     dept_name varchar(50) not null <br />
  ); <br />
For table 'enployees' : <br />
  CREATE TABLE employees( <br />
    emp_id integer primary key, <br />
    first_name varchar(50) not null, <br />
    last_name varchar(50) not null, <br />
    dept_id int references departments(dept_id), <br />
    position varchar(50) not null, <br /> 
    salary numeric(10,2) not null, <br />
    address varchar(100), <br />
    phone_num numeric(10, 0) unique, <br />
    email_id varchar(50) unique, <br />
    hire_date date <br />
  ); <br />
  <br />
  Update the database, username and password values in lines 35-37 in server.js <br />
  <br /> 
  In server.js you can select the port that your express server will work on by changing the value of 'port' in line 40. You must also reflect this port change in /project1_client/package.json by modifying 'proxy'. 
  <br /> <br />
  
  All dependencies are included in the upload. No configuration required.
  Run the server by opening a command prompt in the root directory and typing  <b><i>nodemon ./server.js</i></b> <br />
  Run the client by opening a command prompt in /project1_client and typing <b><i>npm start</i></b><br />
  The following sheet is used: https://docs.google.com/spreadsheets/d/1t6rczRJY8C_Zk12xX0FACQ9q-qCez8MM-vLrG0PTZU0/edit#gid=0 <br />
  You're good to go!
