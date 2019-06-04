const express    = require('express');
const pg         = require('pg');
const morgan     = require('morgan');
const bodyParser = require('body-parser');

const GoogleSpreadSheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json');

var data = [];

async function accessSpreadsheet() {

	const doc = new GoogleSpreadSheet('1t6rczRJY8C_Zk12xX0FACQ9q-qCez8MM-vLrG0PTZU0');
	await promisify(doc.useServiceAccountAuth)(creds);
	const info = await promisify(doc.getInfo)();
	const sheet = info.worksheets[0];

	const rows = await promisify(sheet.getRows)( {
		offest: 1
	});
	
	console.log(data.rows);
	console.log(data.rows.length);
	for(let i = 0; i < data.rows.length; i++){
		console.log('try pushing the data', data.rows[i]);
		await promisify(sheet.addRow)(data.rows[i]);

	}
}





const pool    = new pg.Pool({
				user: 'kevin',
				host: '127.0.0.1',
				database: 'project1',
				password: 'kevin',
				port: '5432'	
				});

const port = 5000;
let app    = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () => console.log(`Listening on port ${port}`));


app.get('/export', (request, response) => {
  
  var dept_name = request.param("dept");
  console.log('querying entries for dept ', dept_name);

  pool.connect((err, db, done) => {
  	if(err) {
  		console.log('error connecting to db: ', err);
		return response.status(400).send(err);
	}
	else
	{
		db.query('SELECT * FROM departments WHERE dept_name = $1', [dept_name], (err, table) => {
			done();
			if(err) {
				console.log('error encountered when looking for dept: ', err);
				return response.status(400).send(err);			
			}
			else {
				console.log(table.rows);
				console.log('Found dept ', dept_name);
				dept_id = table.rows[0].dept_id;
								

				pool.connect((err2, db2, done2) => {
					if(err2) {
						console.log('error connecting to db: ', err2);
						return response.status(400).send(err2);
					}	
					else {
						db2.query('SELECT * FROM employees WHERE dept_id = $1', [dept_id], (err2, table2) => {
							done();
							if(err2) {
								console.log('error encountered while retrieving entries: ', err2);
								return response.status(400).send(err);			
							}
							else {
								
								data = new Object(table2);
								//console.log(data.rows);
								accessSpreadsheet();
								return response.status(200).send(table2);	
							}
							console.log('aloha!');
						})		
					}


				})
			}
		})		
	}	
  })
});

app.post('/import', function(request, response) {
	console.log(`import API accessed`);
	
	var emp_id     = request.body.emp_id;
	var first_name = request.body.first_name;
	var last_name  = request.body.last_name;
	var dept_id    = request.body.dept_id;
	var position   = request.body.position;
	var salary     = request.body.salary;
	var address    = request.body.address;

	let values = [emp_id, first_name, last_name, dept_id, position, salary, address];
	pool.connect((err, db, done) => {
	if(err) {
		return response.status(400).send(err);
	}
	else {
		db.query('INSERT INTO employees VALUES ($1, $2, $3, $4, $5, $6, $7)', [...values], (err, table) => {
			done();
			if(err) {
				console.log(err);
				console.log('DATA INSERTION UNSUCCESSFUL');
				return response.status(400).send(err);
			}
			else{
				console.log('DATA INSERTION SUCCESSFUL');
				response.status(201).send( {detail: 'data insertion successful'} );
			}
		})
	}
})
});


app.get('/get-departments', function(request, response) {
	console.log('departments list queried');
	
	pool.connect((err, db, done) => {
		if(err) {
			return response.status(400).send(err);
		}
		else {
			db.query('SELECT dept_name from departments', (err, table) => {
				done();
				if(err) {
					return response.status(400).send(err);
					console.log('error encountered while querying departments list ', err);
				}
				else {
					return response.status(200).send(table.rows);
					console.log('successful in querying departments list');
				}
			})
		}
	})


});

	

