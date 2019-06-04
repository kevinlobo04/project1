import React, { Component } from 'react';
import { render } from 'react-dom';

class Button extends React.Component {
	constructor(props) {
    	super(props);
    	this.dataTransfers = this.dataTransfers.bind(this);
   		this.state = {
   			items: [],
        count: 0,
    	};
  	}

    dataTransfers(event) {
      event.preventDefault();

      var sheet_id = '1t6rczRJY8C_Zk12xX0FACQ9q-qCez8MM-vLrG0PTZU0';
  		var api_key  = 'AIzaSyAL45tkfGXDReY5Q7v8cslksNcnJNfw2p4';
  		const read_API     = 'https://sheets.googleapis.com/v4/spreadsheets/'+sheet_id+'/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key='+api_key;
  		const append_API   = 'https://sheets.googleapis.com/v4/spreadsheets/'+sheet_id+'/values/Sheet1!B1:Y1000?valueInputOption=USER_ENTERED&majorDimension=ROWS&key='+api_key;


      var count = 0;
  		if(this.props.label == "IMPORT") {
        //CODE TO RETRIEVE DATA FROM GOOGLE SHEETS
        fetch(read_API).then(response => response.json()).then(data => {
      			
            let batchRowValues = data.valueRanges[0].values;
            console.log(data);
 
      			let rows = [];
      			for (let i = 1; i < batchRowValues.length; i++) {
        			let rowObject = {};
        			for (let j = 0; j < batchRowValues[i].length; j++) {
          				rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
        			}
        			rows.push(rowObject);

              var request = new Request('/import', {
              method : 'POST',
              headers: new Headers({ 'Content-Type': 'application/json' }),
              body   : JSON.stringify(rowObject)
              });

              fetch(request)
                .then(function(response) {
                  response.json()
                    .then(function(data) {
                      console.log(data.detail)
                      if(data.detail == 'data insertion successful') { count++; }
                      console.log(count);            
                    })
                })
              } 
          this.setState({ items: rows });
          }
        );
      }

      // MOVES DATA FROM DB TO SHEETS  
      else {

        
        for(let i =0; i < this.props.departments.length; i++) {
            var temp = '/export?dept=' + this.props.departments[i].value;
            console.log('requesting: ', temp);

          var request = new Request(temp, { method : 'GET' });
          fetch(request)
            .then(function(response) {
              response.json()
                .then(function(data) {
                    /*
                   let value = []; 
                  for(let i = 0; i < data.rows.length; i++){
                    let temp = [];
                    temp.push(data.rows[i].emp_id);
                    temp.push(data.rows[i].first_name);
                    temp.push(data.rows[i].last_name);
                    temp.push(data.rows[i].dept_id);
                    temp.push(data.rows[i].position);
                    temp.push(data.rows[i].salary);
                                        temp.push(data.rows[i].address);
                                        value.push(temp);
                    
                    
                                        var request = new Request(append_API, {
                                        method : 'PUT',
                                        body   : JSON.stringify(value)
                                        });
                                
                    
                                        fetch(request)                    .then(function(response) {                        response.json()                          .then(function(data) {                             console.log(data)                          })                      })
                                      }        
                                              
                    
                    
                    
                                    */  
                                    })
                                })
                    
                            }
                          }
                      }
                    
                      render() {
                        return (
                          <div className = "column">
                            <button className = "button row" onClick = {this.dataTransfers}>{this.props.label}</button>
                            
                          </div>
                        );
                      }
                    }
                    
                    export default Button;