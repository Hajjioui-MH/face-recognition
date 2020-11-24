import React,{Fragment} from 'react';
import './FaceDetection.css'

const FaceDetection = ({onInputChange,onImageSubmit,url,box})=>{
	return(
		<Fragment>
		{/*form-zone--------------------*/}
			<div className='form w-70 center pa4 br3 shadow-5'>
				<input className='f4 pa2 w-70 center' type='text'
					onChange={onInputChange}
				/>
				<button className='w-30 grow f4 link ph3 pv2 white bg-light-purple'
					onClick={onImageSubmit}
				>Submit</button>
			</div>

		{/*image-zone-------------------*/}
		<div className='center'>
	      <div className='absolute mt2'
	      	style={url === '' ? null :  {border: "10px solid #026873"}}
	      >
	        <img id='inputimage' alt='' src={url} width='500px' heigh='auto'
	        	style={url === '' ? null :  {marginBottom: '-5px'}}
	        />
	        <div className='bounding-box' 
	        	style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
	        </div>
	      </div>
	    </div>
		</Fragment>
	);
}

export default FaceDetection;