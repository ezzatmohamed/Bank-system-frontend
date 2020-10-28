import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import auth from './auth'

export const AuthRoute =  ({component:Component,...rest})=>{
    return(
        <Route {...rest} 
        render={props=>{
            if(auth.isAuthenticated())
            {
                return <Component {...props}/>
            }
            return <Redirect to='/login'/>
        }

        } />
    )
}

export const NotAuthRoute=  ({component:Component,...rest})=>{
    return(
        <Route {...rest} 
        render={props=>{
            if(!auth.isAuthenticated())
            {
                return <Component {...props}/>
            }
            return <Redirect to='/'/>
        }

        } />
    )
}