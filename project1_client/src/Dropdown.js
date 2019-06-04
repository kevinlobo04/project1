import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

class Dropdown extends React.Component {

	constructor(props) { 
		super(props);
		this.state = {
    		selectedOption: null,
  		};
	}

	handleChange = selectedOption => {
    	this.setState({ selectedOption });
    	this.props.choice(selectedOption);

    	console.log('LLLLLLLIIIIIIISSSSSTTTTTTT');
			console.log(this.state.selectedOption);
			console.log('LLLLLLLIIIIIIISSSSSTTTTTTT');
    };

	render() {
		
		return (
   	 		<Select
      			closeMenuOnSelect={false}
      			components={animatedComponents}
      			isMulti
      			options={this.props.departments}
      			onChange = {this.handleChange}
    		/>
  		);
	}
}

export default Dropdown;