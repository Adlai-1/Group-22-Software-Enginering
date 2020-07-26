import React, {Component} from 'react';
import 'whatwg-fetch';
//import axios from 'axios';
import './signInForm.css';
import SignUpForm from './signUpForm';
import DashBoard from './dashboard';
const skynetLogo = require('./staticFIles/skynet2.jpg');

let showSignUp = false;
let loginStatus = false;

class SignInForm extends Component {
    
    //handling state.
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            token: '',
            isLoading: true,
            openSignUp: showSignUp,
            loginSuccessful: loginStatus,
            signInError: '',
            signInResponse: ''
        }

        //the functions to handle state
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleOpenSignUp = this.handleOpenSignUp.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }


    handleEmail(event) {
        this.setState({email: event.target.value});
      }


    handlePassword(event) {
        this.setState({password: event.target.value});
      }


    handleOpenSignUp(event){
        this.setState({openSignUp: !showSignUp})
      }

    setLoginSuccessful(){
        this.setState({loginSuccessful: true})
    }


    handleSignIn(event){
        //preventing the default behaviour of the form.
        event.preventDefault();

        //grabbing the state props by destructuring.
        const {email, password, signInError} = this.state;

        this.setState({isLoading:true});

        //the post request for signing in.
        fetch('/skynet/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email: email,
                password: password
            })
        })
          .then(res => res.text()) //parsing the response as text.
          .then(data => {
                  this.setState({
                      isLoading: false,
                      loginSuccessful: true,
                      email:'',
                      password:'',
                      signInError: data,
                      signInResponse: data
                  })
                  console.log(`data = , ${JSON.stringify(data)}`);
                  console.log(`sign in error = ${signInError}`);
                  console.log(`sign in response from server = ${this.state.signInResponse}`)
                  console.log(`sign in status  = ${this.state.loginSuccessful}`);
                }).catch(error => {
                    this.setState({
                        isLoading: false,
                        loginSuccessful: loginStatus,
                        signInError: error.message
                    });
                    console.log(`sign in error from catch = ${signInError}`) 
                });

    }
    
    render(){
        if(this.state.openSignUp === false && this.state.loginSuccessful === true){
            let responseInString = this.state.signInResponse.toString();
            if(responseInString.startsWith('Invalid') ) {  //user's credentials do not match.
            return (
                <div>
                    {/* {this.state.signInResponse}
                    <h4 id="backToLogin" onClick={()=>this.setState({loginSuccessful: false})}>Back To Login</h4> */}
                    <DashBoard />
                </div>
            )
            }
            else if(responseInString.endsWith('exist')) { //that is user does not exist.
                return (
                    <div>
                       {/*  {this.state.signInResponse}
                        <h4 id="backToLogin" onClick={()=>this.setState({loginSuccessful: false})}>Back To Login</h4> */}
                        <DashBoard />
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <DashBoard />
                    </div>
                )
            }

        } //end of block.
        else if(this.state.openSignUp === false) {
            return(
            <div id="parentDiv">
                   <form id="loginform" onSubmit={this.handleSignIn}>
                       <div>
                           <img id="logo" src={skynetLogo} width="150px" height="100px" alt="sky net express logo" ></img>
                       </div>
                       
                         <div id="emailText">
                             <input type="email" placeholder="Email" id="user" required spellCheck='false'
                               autoComplete='off' value={this.state.email} onChange={this.handleEmail}>
                               </input>
                         </div>
                         
                         <div  id="passwordText">
                             <input id="user" type="password" placeholder="PASSWORD" required
                              pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,10}$" 
                              title='Password should be 8 to 10 characters long with at least one lowercase, one uppercase, numeric values and special characters'
                              value={this.state.password} onChange={this.handlePassword}></input>
                         </div>

                         <button type='submit' id="submitButton" >Sign In</button>
                         <button id="gotoSignUp" onClick={this.handleOpenSignUp}>Sign Up / Register</button>
                         
                   </form>
            </div>
        )} //end of if.  
        else {
            return (
                <div>
                    <SignUpForm />
                </div>
            )
        }
    
    }

   
     
}




export default SignInForm;