class Auth{

    constructor(){
        this.authnticated =false
    }

    login(cb){
        this.authnticated = true
        cb()
    }
    logout(cb){
        this.authnticated = false
        cb()
    }
    isAuthenticated(){
        
        if(sessionStorage.getItem('token'))
            return true;
        return false;
    }
}

export default new Auth()