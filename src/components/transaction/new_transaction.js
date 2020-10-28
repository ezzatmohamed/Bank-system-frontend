import React, {Component} from 'react';
import {Redirect } from 'react-router-dom'
import './new_transaction.css'
class NewTransaction extends Component{

    constructor(props) {
        super(props)
        this.state={
          id:parseInt(props.match.params.id),
          redirect:false,
          depositTo:-1,
          depositBalance:-1,
          withdrawFrom:-1,
          withdrawBalance:-1,
          tranferFrom:-1,
          transferTo:-1,
          transferBalance:-1
        }
        this.onChange = this.onChange.bind(this)
        this.AddDeposit =this.AddDeposit.bind(this)
        this.AddWithdraw =this.AddWithdraw.bind(this)
        this.AddTransfer =this.AddTransfer.bind(this)
      }
      onChange(e){
        this.setState({[e.target.name]:e.target.value},console.log(this.state))

    }
    AddDeposit(e){
      e.preventDefault();
      fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({query:`mutation{depositMoney(transId:${this.state.id},to:${this.state.depositTo},balance:"${this.state.depositBalance}")}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            if(data.errors){
                alert('error')
                
            }   
            else{
              if(data.data.depositMoney=="true")
                alert("added deposit!")
              else
                alert("error")
            }
        });
    }
    AddWithdraw(e){
      e.preventDefault();
      if(this.state.withdrawFrom==-1||this.state.withdrawBalance==-1)
      {
        alert("error")
        return
      }
      fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({query:`mutation{withdrawMoney(transId:${this.state.id},from:${this.state.withdrawFrom},balance:"${this.state.withdrawBalance}")}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            if(data.errors){
                alert('error')
                
            }   
            else{
                if(data.data.withdrawMoney=="true")
                  alert("added withdraw!")
                else
                  alert('error')
            }
        });
    }
    AddTransfer(e){
      e.preventDefault();
      if(this.state.transferTo==-1||this.state.transferBalance==-1||this.state.transferFrom==-1)
      {
        alert("error")
        return
      }
      fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({query:`mutation{transferMoney(transId:${this.state.id},from:${this.state.transferFrom},to:${this.state.transferTo},balance:"${this.state.withdrawBalance}")}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            if(data.errors){
                alert('error')
            }   
            else{
                if(data.data.transferMoney=="true")
                  alert("added transfer!")
                else
                  alert("error")
            }
        });
    }

    render(){
        return (
            <div >
                <div className="login-page">
                  <div className="form">
                    <form className="login-form">
                        <p>Deposit</p>

                        <input type="number" name="depositTo"  onChange={this.onChange} placeholder="Deposit To {account id}"/>
                      <input type="number" name="depositBalance"  onChange={this.onChange} placeholder="Deposit balance in EGP"/>
                      <button className="Add" onClick={this.AddDeposit}>Add deposit</button>
                        <p>Withdraw</p>
                      <input type="number"  name="withdrawFrom" onChange={this.onChange} placeholder="Withdraw From {account id}"/>
                      <input type="number"  name="withdrawBalance" onChange={this.onChange} placeholder="Withdraw balance in EGP"/>
                      <button className="Add" onClick={this.AddWithdraw}>Add withdraw</button>
                        <p>Transfer</p>
                      <input type="number" name="transferFrom"   onChange={this.onChange} placeholder="Transfer From {account id}"/>
                      <input type="number" name="transferTo"  onChange={this.onChange} placeholder="Transfer To {account id}"/>
                      <input type="number" name="transferBalance"  onChange={this.onChange} placeholder="Transfer Balance in EGP"/>
                      <button className="Add" onClick={this.AddTransfer}>Add Transfer</button>
                      
                      <button className="Finish">Finish</button>
                    </form>
                  </div>
                </div>
            </div>
        )
    }
}

export default NewTransaction   