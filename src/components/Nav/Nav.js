import React,{Fragment} from 'react';
import Tilt from 'react-tilt';
import logoSrc from './logo.png';

const Nav = ({onRouteChange,isSignIn})=>{
	if (isSignIn) {
		return (
			<Fragment>
				<nav className='flex justify-between ph4'>
				{/*LOGO----------------*/}
					<div className='logo ma3'>
						<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
				        <div className="Tilt-inner">
				          <img style={{paddingTop: '0.6em'}} alt='logo' className='' src={logoSrc} />
				        </div>
				      </Tilt>
					</div>
				{/*Sign Out----------------*/}
					<div className='sign-out mv3'>
						<p className='f3 link underline dim black b pointer'
							onClick={()=>onRouteChange('signin')}
						>Sign Out</p>
					</div>
				</nav>
			</Fragment>
		);
	}
	else{
		return (
			<Fragment>
				<nav className='flex justify-between ph4'>
				{/*LOGO----------------*/}
					<div className='logo ma3'>
						<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
				        <div className="Tilt-inner">
				          <img style={{paddingTop: '0.6em'}} alt='logo' className='' src={logoSrc} />
				        </div>
				      </Tilt>
					</div>
				{/*Sign Out----------------*/}
					<div className='sign-out mv3'>
						<p className='f3 link underline dim black b pointer pb2'
							onClick={()=>onRouteChange('signin')}
						>Sign In</p>
						<p className='f3 link underline dim black b pointer'
							onClick={()=>onRouteChange('register')}
						>Register</p>
					</div>
				</nav>
			</Fragment>
		);
	}
	
}

export default Nav;