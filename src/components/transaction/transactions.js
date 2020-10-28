import React, {Component} from 'react';
import {Redirect } from 'react-router-dom'
import './transactions.css'
import Transaction from './transaction'
class Transactions extends Component{

    constructor(props) {
        super(props)
        this.state={
            redirect:false,
            from:"2010-01-01",
            to:"2030-01-01",
            transactions:[],
            newID:-1
          }
          this.getAllTransactions= this.getAllTransactions.bind(this)
          this.newTransaction= this.newTransaction.bind(this)
          this.onChange=this.onChange.bind(this)
          
      }
      newTransaction()
      {
        alert(1)
        fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({query:`mutation{newTransaction}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
          alert("success")
            let NewId = data.data.newTransaction
            this.setState({
              newID:NewId,
              redirect:true
            })
            

        });
        // console.log(this.state)
      }
      componentDidMount(){
          this.getAllTransactions()
      }
      displayTransactions(){
        return this.state.transactions.map(transaction=>{
            return (<Transaction key={transaction.id} 
                             id={transaction.id} 
                             withdraws={transaction.withdraws}
                             deposits={transaction.deposits}
                             transfers={transaction.transfers} ></Transaction>)
        })
      }
      getAllTransactions(){
        console.log(this.state)
        fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({query:`{getTransactions(from:"${this.state.from} 00:00:00",to:"${this.state.to} 23:59:59"){
                id
                user_id
                withdraws{
                from
                balance
                }
                deposits{
                to
                balance
                }
                transfers{
                from
                to 
                balance
                }
            }}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
          console.log(data)
            let temp = data.data.getTransactions
            this.setState({transactions:temp.slice()})
            

        });
        // console.log(this.state)
      }
      componentDidMount(){
          this.getAllTransactions()
      }
      // deleteTransaction(id)
      // {
        
      //   for(let i =0;i<this.state.transactions.length;i++)
      //   {
      //     if(this.state.transactions[i].id == id)
      //     {
      //       this.state
      //       break
      //     }
      //   }
      // }
      displayTransactions(){
        return this.state.transactions.map(transaction=>{
            return (<Transaction key={transaction.id} 
                             id={transaction.id} 
                             withdraws={transaction.withdraws}
                             deposits={transaction.deposits}
                             transfers={transaction.transfers} 
                             ></Transaction>)
        })
      }
      onChange(e){
        this.setState({[e.target.name]:e.target.value},function(){
          this.getAllTransactions()})
    }
    render(){
      if(this.state.redirect){
        return (<Redirect to={'/new-transaction/'+this.state.newID}/>)
      }
        return (
            <div >
             <input   onChange={this.onChange} type="date" id="date" name="from" value ={this.state.from}></input>
         <input type="date" id="date" name="to"
      
      value ={this.state.to} onChange={this.onChange}  >
       </input>
             <button className="new-transaction"  onClick={this.newTransaction}>New Transaction</button>
            
              {this.displayTransactions() }
            </div>
        )
    }
}

export default Transactions