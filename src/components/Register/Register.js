import React,{Component} from 'react';
import ReactTooltip from "react-tooltip";
import aboutIcon from "./about-icon.png";

class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			name : '',
			email : '',
			password : '',
			error : {
				message : '',
				nameErr : true,
				passwordErr : true,
				emailErr : true
			}
		}
	}
handleChanges = (event)=>{
	const {name,value} = event.target;
	this.setState({ [name] : value });
}
inputValidation = ()=>{
	const {email,password,name} = this.state;
	const email_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
	const name_FORMAT = /^([a-zA-Z0-9_-]){3,7}$/ ;
	const isNameValid = ()=>{
		if (name.match(name_FORMAT)){
			this.setState(Object.assign(this.state.error, {nameErr: true}))
			return true
		}
		else{
			this.setState(Object.assign(this.state.error, {nameErr:false}))
			return false
		}
	}
	const isEmailValid = ()=>{
		if (email.match(email_FORMAT)){
			this.setState(Object.assign(this.state.error, {emailErr: true}))
			return true
		}
		else{
			this.setState(Object.assign(this.state.error, {emailErr:false}))
			return false
		}
	}
	const isPasswordValid = ()=>{
		if (password.length >= 3){
			this.setState(Object.assign(this.state.error, {passwordErr: true}))
			return true
		}
		else{
			this.setState(Object.assign(this.state.error, {passwordErr:false}))
			return false
		}
	}
	isNameValid();
	isEmailValid();
	isPasswordValid();
	if( isNameValid() && isEmailValid() && isPasswordValid())
	{
		return true;
	}
	else
		return false;
}
onSubmitRegister = ()=>{
	const {email,password,name} = this.state;
	if ( !this.inputValidation() ) {
		this.setState(Object.assign(this.state.error, {message:'incorrect form submission !'}))
	}
	else{
		fetch('https://vast-spire-73643.herokuapp.com/register', {
		method : 'post',
		headers : {'Content-Type' : 'application/json'},
		body : JSON.stringify({
			name : name,
			email : email,
			password : password
		})
		})
		.then(response=> response.json())
		.then(user=>{
			if (user.id) {
				this.props.loadUser(user)
				this.props.onRouteChange('home')
			}
			else
				this.setState(Object.assign(this.state.error, {message:'unable to register !'}))
		})
	}
}


  render(){
	  return (
	  	<article className="br3 ba b--black-10 w-100 w-50-m w-25-l mw6 shadow-5 center">
		    <main className="pa4 black-80 ">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="text" 
					        name="name"  
					        id="name" 
					        style={this.state.error.nameErr===false ? {borderColor: 'red',borderStyle: 'solid'} : null}
					        onChange={this.handleChanges}
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email"  
					        id="email-address" 
					        style={this.state.error.emailErr===false ? {borderColor: 'red',borderStyle: 'solid'} : null}
					        onChange={this.handleChanges}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password" 
					        style={this.state.error.passwordErr===false ? {borderColor: 'red',borderStyle: 'solid'} : null}
					        onChange={this.handleChanges}
				        />
				      </div>
			    </fieldset>

			    <div className="pb3">
			      	<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" 
			      		onClick={this.onSubmitRegister}
			      	/>
			    </div>
			  	{
				  	this.state.error.message.length !==0 ? 
				  	<div className="flex">
				    	<img data-tip data-for='global' className='ma0 ph1' alt="" style={{width:18}} src={aboutIcon} />
				    	<ReactTooltip id='global' aria-haspopup='true' >
				    		   <li>Name</li>
							   <p>Allow letters, numbers, and underscores and length must be between 3 and 7 characters</p>
							   <li>Email</li>
							   <p>Your email adress format should be like : personal_info@domain</p>
							   <li>Password</li>
							   <p>Your password length should be >= 3</p>
						 </ReactTooltip>
				    	<p className='fl f6 navy b ma0 pa0'>{`${this.state.error.message}`}</p>
				    </div>
				    :''
				  }
			  </div>
			</main>
		</article>
	  );
	}
}

export default Register;




