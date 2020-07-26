import React, {Component} from 'react';
import 'whatwg-fetch';
//import axios from 'axios';
import './signUpForm.css';
import SignInForm from './signInForm';
const skynetLogo = require('./staticFIles/skynet2.jpg');


let showSignIn = false;

class SignUpForm extends Component {
    //handling state.
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            telephone: '',
            token: '',
            signUpError:'',
            isLoading: true,
            openSignIn: showSignIn
        }


        //the functions to handle state
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleTelephone = this.handleTelephone.bind(this);
        this.handleOpenSignIn = this.handleOpenSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleUsername(event) {
        this.setState({username: event.target.value});
      }


    handleEmail(event) {
        this.setState({email: event.target.value});
      }


    handlePassword(event) {
        this.setState({password: event.target.value});
      }

    handleTelephone(event) {
        this.setState({telephone: event.target.value});
      }

    handleOpenSignIn(event){
      this.setState({openSignIn: !showSignIn})
    }

    handleSignUp(event) {
        //event.preventDefault();
        //grabbing the state
        const {
            username,
            email,
            password,
            telephone
        } = this.state;

        this.setState({
            isLoading: true
        })

        //making the post request to the server.
        fetch('/skynet/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                telephone: telephone
            }),
        }).then(res => res.json())
          .then(json => {
              console.log('json = ', json);

              if (json.success) {
                this.setState({
                  isLoading: false,
                  username:'',
                  email: '',
                  password: '',
                  telephone: '',
                  signUpError: json.message
                });
                console.log('error = ', this.state.signUpError);
              } 
              else {
                this.setState({
                  isLoading: false,
                  signUpError: json.message
                });
                console.log('error = ', this.state.signUpError)
              }
          })
         
      }


    render(){
       
      if(this.state.openSignIn === false){  
        return(
            <div id="parentDiv">
                   <form id="loginform" onSubmit={this.handleSignUp}>
                       <div>
                           <img id="logo" src={skynetLogo} width="150px" height="100px" alt="sky net express logo" ></img>
                       </div>

                       <div id="usernameText">
                         <input id="user" type="text" placeholder="USERNAME" required spellCheck='false'
                              autoComplete='off' value={this.state.username} onChange={this.handleUsername} ></input>
                         </div>

                         <div id="emailText">
                             <input type="email" placeholder="EMAIL " id="user" required spellCheck='false'
                               autoComplete='off' value={this.state.email} onChange={this.handleEmail}></input>
                         </div>
                         
                         <div  id="passwordText">
                             <input id="user" type="password" placeholder="PASSWORD" required 
                               value={this.state.password} onChange={this.handlePassword}
                               pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,10}$" 
                               title='Password should be 8 to 10 characters long with at least one lowercase, one uppercase, numeric values and special characters'
                              ></input>
                         </div>
                         
                         <div id="telephoneText">
                             <input id="user" placeholder="TELEPHONE" type="number" required autoComplete='off'
                             value={this.state.telephone} onChange={this.handleTelephone}></input>
                         </div>
                      

                         <button type="submit" id="submitButton" >Sign Up</button>

                         <button id="goToSignIn" onClick={this.handleOpenSignIn}>Proceed To Sign In</button>
                   </form>
            </div>
        )
      } //end of if
      else {
        return (
          <div>
            <SignInForm />
          </div>
        )
      }
    
    }

   
     
}




export default SignUpForm;