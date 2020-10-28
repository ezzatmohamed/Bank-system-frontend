import React, {Component} from 'react';
import './header.css'
import {Link} from 'react-router-dom'
import {Router,Redirect } from 'react-router-dom'
class Header extends Component{

    constructor(props) {
        super(props)
        this.state = {
            redirect:false
          }
        this.logout = this.logout.bind(this)
      }
      logout(e){
          e.preventDefault();
          sessionStorage.setItem('token','')
          sessionStorage.clear() 
          this.setState({redirect:true})
        //   console.log(this.props)
      }
 
      renderLinks(){
          if(sessionStorage.getItem('token'))
          {
                return ( <ul>
                    <li> <a className="selected" href='/'>Home</a></li>
                    <li><a href='/create-account'>Create Account</a></li>
                    <li><a href='/transactions'>Transactions</a></li>
                    <li><a href='/login' onClick={this.logout}>Logout</a></li>
                </ul> )
          }
          else{
            return (<ul>
                <li><a href='/signup'>Signup</a></li>
                <li><a href='/login'>Login</a></li>
            </ul>)
          }
          
      }
    render(){

        return (
            <div  className = 'header'>
                 <div className = 'header-bar' >   
                    <div className="nav-menu">
                    <ul>
                    <li> <a className="selected" href='/'>Home</a></li>
                    <li><a href='/create-account'>Create Account</a></li>
                    <li><a href='/transactions'>Transactions</a></li>
                <li><a href='/signup'>Signup</a></li>
                <li><a href='/login'>Login</a></li>
                    <li><a href='/login' onClick={this.logout}>Logout</a></li>
                </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header