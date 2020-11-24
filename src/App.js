import React,{Component} from 'react';
import Nav from './components/Nav/Nav';
import SignIN from './components/SignIn/SignIN';
import Register from './components/Register/Register';
import FaceDetection from './components/FaceDetection/FaceDetection';
import UserInfo from './components/UserInfo/UserInfo';
import Particles from 'react-particles-js';
import './App.css'

const particlesOptions = {
particles: {
  number: {
    value: 100,
    density: {
      enable: true,
      value_area: 800
    }
  }
}
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      route : 'signin',
      isSignIn : false,
      input : '',
      box : {},
      currentUser : {
        id : '',
        name : '',
        email : '',
        entries : 0,
        joined : new Date()
      }
    }
  }
onInputChange = (event)=>{
  this.setState({box:{}})
  this.setState({input:event.target.value})
}
onRouteChange = (route)=>{
  if(route === 'home')
    this.setState({isSignIn : true})
  else
    this.setState({isSignIn : false})
  this.setState({route:route})
}
loadUser = (user)=>{
  const {id,name,email,entries} = user
  this.setState({input:''})
  this.setState({currentUser : {
      id : id,
      name : name,
      email : email,
      entries : entries,
      joined : new Date()
  }})
}
calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}
displayFaceBox = (box) => {
  this.setState({box: box});
}
onImageSubmit = ()=>{
  fetch('https://vast-spire-73643.herokuapp.com/clarifai', {
    method : 'post',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify({imageUrl : this.state.input})
  })
  .then(response=>response.json())
  .then(response=>{
    if(response){
        fetch('https://vast-spire-73643.herokuapp.com/entries', {
          method : 'put',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({id : this.state.currentUser.id})
        })
          .then(response=>response.json())
          .then(count=>this.setState(Object.assign(this.state.currentUser , {entries : count} )))
          .catch(err=>console.log('unable to update entries'))
      }
    this.displayFaceBox( this.calculateFaceLocation(response) )
  })
  .catch(err=> console.log(err))
}



  render(){
    const {isSignIn,currentUser,input,box} = this.state;
    return (
    <div className="App">
      <Particles className='particles'params={particlesOptions}/>
      <Nav onRouteChange={this.onRouteChange} isSignIn={isSignIn}/>
      {
        this.state.route === 'home' 
        ? 
          <div>
           <UserInfo user={currentUser}/>
           <FaceDetection url={input} box={box} 
            onInputChange={this.onInputChange}
            onImageSubmit={this.onImageSubmit}/>
          </div>
        :
          (this.state.route === 'signin' 
            ? <SignIN onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
      }
    </div>
  );
  }
  
}

export default App;
