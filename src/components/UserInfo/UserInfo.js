import React,{Fragment} from 'react';

const UserInfo = ({user})=>{
	return(
		<Fragment>
			<p className='f3 pa0 ma0'>Welcome {user.name} , your current entry count is...</p>
			<p className='f2 pa0 ma0'>#{user.entries}</p>
		</Fragment>
	);
}

export default UserInfo;