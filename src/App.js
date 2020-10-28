
import './App.css';
import Header from './components/header/header'
import Login from './components/login/login'
import Signup from './components/signup/signup'
import CreateAccount from './components/account/create/CreateAccount'
import UpdateAccount from './components/account/update/UpdateAccount'
import Home from './components/home/home'
import Transactions from './components/transaction/transactions'
import NewTransaction from './components/transaction/new_transaction'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useQuery,gql} from '@apollo/client'
import {withRouter} from 'react-router'
import {AuthRoute,NotAuthRoute} from './protected.route'
function App() {
    
    // const {loading ,error,data} = useQuery(GET_USR)
    // console.log(data)
    // fetch('http://localhost:8000/graphql', {
    //         method: "POST",
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({query:`{user(id:4){email} }`})
    //       }
    //     )
    //     .then(response => response.json())
    //     .then(data =>{
    //         console.log(data.data.user)
    //     });
    return ( 
        
    <Router>
        <div className = "App">
            <Header></Header> 
            <Switch>
                <AuthRoute path='/' exact component={Home}/>
                <NotAuthRoute path='/login' exact  component={Login}/>
                <NotAuthRoute path='/signup' exact component={Signup}/>
                <AuthRoute path='/create-account' exact component={CreateAccount}/>
                <AuthRoute path='/update/:id' exact component={UpdateAccount}/>
                <AuthRoute path='/transactions' exact component={Transactions}/>
                <AuthRoute path='/new-transaction/:id' exact component={NewTransaction}/>
                
            </Switch>
    
    
        </div>
    </Router>

        
    );
}

export default App;