import React from 'react';
import Button from './Button.js';
import Dropdown from './Dropdown.js';

class ExportPane extends React.Component {

	constructor(props) { 
		super(props);
		this.state = {
			departments: [],
			departments_selected: []
		};
	}

	componentDidMount() {
		fetch('/get-departments').then(response => response.json()).then(data => {
		
			let temp = [];
			for(let i = 0; i < data.length; i++)
			{
				temp.push({ value: data[i].dept_name, label :  data[i].dept_name});
			}
			this.setState( {departments: temp} );
			
		})
	}

	callback = (selection) => {
        this.setState( {departments_selected: selection} );
    };	

	render() {
		return(
			<div className="unnamed">
				<Button label = "EXPORT" departments = {this.state.departments_selected} />
				<div className = "dropdown">
					<Dropdown departments = {this.state.departments} choice = {this.callback}/>	
				</div>
				
			</div>
		);
	}
}

export default ExportPane;