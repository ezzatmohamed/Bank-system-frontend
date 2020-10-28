import React, {Component} from 'react';
import './home.css'
import Account from './account/account'
import {Redirect } from 'react-router-dom'
class Home extends Component{

    constructor(props) {
        super(props)
        this.state = {
            redirect:false,
            accounts:[],
            filter:"all"
        }
        this.getAllaccount=this.getAllaccount.bind(this)
        this.getByBank=this.getByBank.bind(this)
        this.onChange=this.onChange.bind(this)
      }

      getAllaccount(){
        fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({query:`{accounts{
                id
                balance
                bank
                type
                currency
                activated
            }}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
            let temp = data.data.accounts
            this.setState({accounts:temp.slice()})
            

        });
        // console.log(this.state)
      }
      componentWillMount(){

        this.getAllaccount()
      }
      getByBank()
      {

        fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({query:`{accounts(bank:"${this.state.filter}"){
                id
                balance
                bank
                type
                currency
                activated
            }}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            let temp = data.data.accounts
            this.setState({accounts:temp.slice()})
            

        });
      }
      displayAccounts(){
          return this.state.accounts.map(account=>{
              return (<Account key={account.id} 
                               id={account.id} 
                               bank={account.bank}
                               currency={account.currency}
                               type={account.type}
                               balance={account.balance}
                               activated={account.activated} ></Account>)
          })
      }
      onChange(e){
        this.setState({[e.target.name]:e.target.value},function(){
            if(e.target.value == "all")
                this.getAllaccount()
            else
                this.getByBank()
        }
            )
  
      }
    render(){
        return (
            <div >
                
                <span   className="custom-dropdown big">
                    <select onChange={this.onChange} value ={this.state.filter} name="filter">    
                        <option value="all"  label="all" >All</option>
                        <option value="cib"  label="cib">CIB</option>  
                        <option value="qnb"  label="qnb">QNB</option>
                        <option value="hsbc" label="hsbc">HSBC</option>
                    </select>
                </span>
        {       this.displayAccounts() }
            </div>
        )
    }
}

export default Home