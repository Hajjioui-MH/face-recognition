import React,{Component} from 'react';
import ReactTooltip from "react-tooltip";
import aboutIcon from "./about-icon.png";

class SingIN extends Component{
	constructor(){
    super();
    this.state = {
      signInEmail : '',
      signInPassword : '',
      error : ''
    }
  }
handleChanges = (event)=>{
	const {name,value} = event.target;
	this.setState({ [name] : value });
}
inputValidation = ()=>{
	const {signInEmail,signInPassword} = this.state;
	const email_Format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if( signInEmail.match(email_Format) && (signInPassword.length >= 3))
	{
		return true;
	}
	else
		return false;
}
onSubmitSingIn = ()=>{
	//input verification before fetching data from server
	const {signInEmail,signInPassword} = this.state;
	if ( !this.inputValidation() ) {
		this.setState({error : 'incorrect form submission !'})
	}
	else{
		fetch('https://vast-spire-73643.herokuapp.com/signin', {
			method : 'post',
			headers : {'Content-Type' : 'application/json'},
			body : JSON.stringify({
				email : signInEmail,
				password : signInPassword
			})
		})
		.then(response=>response.json())
		.then(user=>{
			if (user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home')
			}
			else
				this.setState({error : 'wrong credentials !'})
		})
	}
}

	render(){
		const {onRouteChange} = this.props;
		return(
			<article className="br3 ba b--black-10 w-100 w-50-m w-25-l mw6 shadow-2 center">
			    <main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="email" 
						        name="signInEmail"  
						        id="email-address"
						        onChange={this.handleChanges}  
						     />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input 
						        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="password" 
						        name="signInPassword"  
						        id="password"
						        onChange={this.handleChanges} 
					        />
					      </div>
				    </fieldset>

				    <div className="">
				      	<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" 
				      		onClick={this.onSubmitSingIn}
				      	/>
				    </div>
				    <div className="lh-copy mt3">
				      	<p className="f6 link pointer dim black db"
				      		onClick={()=>onRouteChange('register')}
				      	>Register</p>
				    </div>
				  </div>

				  {
				  	this.state.error.length !==0 ? 
				  	<div className="flex">
				    	<img data-tip data-for='global' className='ma0 ph1' alt="" style={{width:18}} src={aboutIcon} />
				    	<ReactTooltip id='global' aria-haspopup='true' >
							   <li>Email</li>
							   <p>Your email adress format should be like : personal_info@domain</p>
							   <li>Password</li>
							   <p>Your password length should be >= 3</p>
						 </ReactTooltip>
				    	<p className='fl f6 navy b ma0 pa0'>{`${this.state.error}`}</p>
				    </div>
				    :''
				  }
				  	
				</main>
			</article>
		);
	}
}
export default SingIN;