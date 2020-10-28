import React, {Component} from 'react';
import {Redirect } from 'react-router-dom'
import './transaction.css'
class Transaction extends Component{

    constructor(props) {
        super(props)
        this.state={
            redirect:false,
            id:props.id,
            withdraws:props.withdraws,
            deposits:props.deposits,
            transfers:props.transfers
          }
          this.displayWithdraws = this.displayWithdraws.bind(this)
          this.displayDeposits = this.displayDeposits.bind(this)
          this.displayTransfers = this.displayTransfers.bind(this)
          this.deleteTransaction = this.deleteTransaction.bind(this)
          console.log(props)
      }
      deleteTransaction(){
        fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({query:`mutation{deleteTransaction(transId:${this.state.id})}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            if(data.errors){
                alert('error')
                
            }   
            else{
                if(data.data.deleteTransaction)
                  alert("removed Transaction")
                else
                  alert('error')
            }
        });
      }

      displayWithdraws(){

        return this.state.withdraws.map(withdraw=>{
            return (<p><b>Withdraw</b><span> From {withdraw.from}, <b>Balance</b> {withdraw.balance}</span></p>)
        })
      }
      displayDeposits(){
        return this.state.deposits.map(deposit=>{
            return (<p><b>Deposit</b><span> From {deposit.to}, <b>Balance</b> {deposit.balance}</span></p>)
        })
      }
      displayTransfers(){
        return this.state.transfers.map(transfer=>{
            return (<p><b>Transfer</b><span> From {transfer.from} To {transfer.to}, <b>Balance</b> {transfer.balance}</span></p>)
        })
      }
    render(){
        return (
            <div >
                <div className="account-container">
                    {/* <p><b>Withdraw</b><span> From 1, <b>Balance</b> 1003</span></p>
                    <p><b>Deposit</b><span> To 4, <b>Balance</b> 1003</span></p>
                    <p><b>Transfer</b><span>From 1 To 3, <b>Balance</b> 1003</span></p>
     */}
                    {this.displayDeposits()}
                    {this.displayWithdraws()}
                    {this.displayTransfers()}
                    <button onClick={this.deleteTransaction}>Delete</button>
                </div>
            </div>
        )
    }
}

export default Transaction