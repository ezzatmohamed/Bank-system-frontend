import React, {Component} from 'react';
import './signup.css'
import {Redirect } from 'react-router-dom'
class Signup extends Component{

    constructor(props) {
        super(props)
        this.state={
          name:'',
          email:'',
          password:'',
          redirect:false
      }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }
      onSubmit(e){

        e.preventDefault()
        console.log(this.state)
        fetch('/graphql', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({query:`mutation{signup(email:"${this.state.email}",password:"${this.state.password}",name:"${this.state.name}"){name}}`})
        }
      )
      .then(response => response.json())
      .then(data =>{
          console.log(data)
          if(data.errors){
              console.log('error')
              alert('invalid registeration')
          }   
          else{
              console.log(data)
              this.setState({
                redirect:true
            })
          }
      });
    }
    onChange(e){
      this.setState({[e.target.name]:e.target.value})
  }
    render(){
      if(this.state.redirect )
      {
          return (<Redirect to='/login'/>)
      }
        return (
            <div >
                <div className="login-page">
                  <div className="form">
                    <form className="login-form"  onSubmit={this.onSubmit}>
                      <input type="text" name='name' onChange={this.onChange} placeholder="name"/>
                      <input type="email" name='email' onChange={this.onChange} placeholder="email"/>
                      <input type="password" name='password' onChange={this.onChange}  placeholder="password"/>
                      <button>Register</button>
                        <a href='/login'>OR Login</a>
                    </form>
                  </div>
                </div>
            </div>
        )
    }
}

export default Signup