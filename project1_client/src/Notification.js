import React, { Component } from 'react';
import { render } from 'react-dom';

class Notification extends React.Component {
	constructor(props) {
    super(props);
    }

	render() {
		if(this.props.flag == 1)
		return (
			 <div class="alert">
  			 <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
  			 Data has been successfully imported!
			 </div> 
		);
	}


}

export default Notification;