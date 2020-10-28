import React, {Component} from 'react';
import './login.css'
import {Redirect } from 'react-router-dom'

class Login extends Component{

    constructor(props) {
        super(props)
        this.state={
            email:'',
            password:'',
            redirect:false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }

      onChange(e){
          this.setState({[e.target.name]:e.target.value})
      }
      onSubmit(e){
          e.preventDefault()
          
          fetch('/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({query:`mutation{login(email:"${this.state.email}",password:"${this.state.password}")}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            if(data.errors){
                alert('invalid login')
                
            }   
            else{
                console.log(data.data.login)
                sessionStorage.setItem('token',data.data.login)
                this.setState({
                    redirect:true
                })
            }
        });
      }
    render(){
        if(this.state.redirect )
        {
            return (<Redirect to='/'/>)
        }

        return (
            
            <div >
                <div className="login">    
                    <form id="login" onSubmit={this.onSubmit}>  
                        <label><b>Email</b>  
                        ~{"\n"}
                        </label>
                        <input type="email" name="email" id="Uname" onChange={this.onChange} placeholder="Email"/>    
                        {"\n"}{"\n"}
                        <label><b>Password     </b>  
                        ~{"\n"}
                        </label>
                        <input type="password" name="password" id="Pass"  onChange={this.onChange} placeholder="Password"/>    
                        {"\n"}{"\n"}
                        <button className='select-photo c-button' id ="login-button">Login</button>
                        <p></p>
                        <a href='/signup'>OR create new account</a>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login