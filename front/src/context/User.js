import { createContext, useState} from "react";

const UserContext = createContext({

    state : { accessToken : ''},
    actions : {
        setAccessToken: ()=>{},
    }
    
});

const UserProvider = ({children})=>{
    const [accessToken, setAccessToken] = useState('');

    const value = {
        state: {accessToken},
        actions:{setAccessToken},
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
};

const {Consumer : UserConsumer} = UserContext;

export {UserProvider, UserConsumer};
export default UserContext;