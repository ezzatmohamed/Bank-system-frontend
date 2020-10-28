import React, {Component} from 'react';
import './account.css'
class Account extends Component{

    constructor(props) {
        super(props)
       
        this.state={
            bank:props.bank,
            id:props.id,
            type:props.type,
            currency:props.currency,
            balance:props.balance,
            activated:props.activated
        }
        this.activatedButton = this.activatedButton.bind(this)
        this.handleActivate = this.handleActivate.bind(this)
        this.handleDeactivate = this.handleDeactivate.bind(this)
      }
    
      handleActivate(){
        fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({query:`mutation{activate(id:${this.state.id})}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
                this.setState({activated:true})

        });
      }
      handleDeactivate(){

        fetch('http://localhost:8000/graphql', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({query:`mutation{deactivate(id:${this.state.id})}`})
          }
        )
        .then(response => response.json())
        .then(data =>{
            
                this.setState({activated:false})
          

            // this.setState({activated:data.activated})


        });
      }
      activatedButton(){
          if(this.state.activated)
            return (<button onClick={this.handleDeactivate} id="activated" >Activated</button>)
           else
            return (<button onClick={this.handleActivate} id="deactivated">DeActivated</button>)
      }
    render(){
        return (
            <div >
                <div className="account-container">
                    <p><b>Bank:</b><span>{this.state.bank}</span></p>
                    <p><b>ID:</b><span>{this.state.id}</span></p>
                    <p><b>Type:</b><span>{this.state.type}</span></p>
                    <p><b>Currency:</b><span>{this.state.currency}</span></p>
                    <p><b>Balance:</b><span>{this.state.balance}</span></p>
                    {this.activatedButton()}
                    
                    <a href={'/update/'+this.state.id}><button >Update</button></a>
                    
                </div>
            </div>
        )
    }
}

export default Account