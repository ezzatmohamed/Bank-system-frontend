import React, {Component} from 'react';
import './UpdateAccount.css'
import {Redirect } from 'react-router-dom'
class UpdateAccount extends Component{

    constructor(props) {
        super(props)
        this.state={
          redirect:false,
          id:parseInt(props.match.params.id),
          bank:'',
          type:''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
      }
      componentWillMount() {
        fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({query:`{account(id:${this.state.id}){
                bank
                type
            }}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
            this.setState({
              bank:data.data.account.bank,
              type:data.data.account.type
            })
            console.log(this.state)

        });
      }
      onSubmit(e){
        e.preventDefault()
          
          fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({query:`mutation{updateAccount(id:${this.state.id},bank:"${this.state.bank}",type:"${this.state.type}"){
              bank
              type
            }}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            if(data.errors){
                alert("error")
                
            }   
            else{
                alert("success")
            }
        });
      }
      onChange(e){
        this.setState({[e.target.name]:e.target.value})
        // console.log(this.state)
    }
    render(){
        if(!sessionStorage.getItem('token'))
        {
            return (<Redirect to='/login'/>)
        }
        return (
            <div >
                <div className="login-page">
                  <div className="form">

                    <form className="login-form" onSubmit={this.onSubmit}>
                        <p>Bank</p>
                      <select  onChange={this.onChange} value ={this.state.bank} name="bank"  id="bankList">
                        <option value="cib"label="cib">CIB</option>
                        <option value="qnb" label="qnb">QNB</option>
                        <option value="hsbc" label="hsbc">HSBC</option>
                      </select>
                        <p>Type</p>
                      <select  onChange={this.onChange} value ={this.state.type} name="type" id="Type">
                        <option value="current" label="current">Current</option>
                        <option value="saving" label="saving">Saving</option>
                        <option value="credit" label="credit">Credit</option>
                        <option value="joint" label="joint">Joint</option>
                      </select>

                      
                      <button>Update</button>
                    </form>
                  </div>
                </div>
            </div>
        )
    }
}

export default UpdateAccount