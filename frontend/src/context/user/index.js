import React, { useReducer, useContext, useEffect } from 'react';
import Context, { initialState } from './context';
import reducer from './reducer';
import { 
    getUsers,
    getUser,
    createUser,
    updateProfile,
    login,
    signUp,
    changePassword,
    isLoggedIn,
    isAdmin,
    resetStore,
    sendEnquiery,
    deleteUser,
    updateUser,
    signOut,
} from './actions';

const UserContextProvider = ({
    children,
    initialContext = initialState,
}) => {
    const [state, dispatch] = useReducer(reducer, initialContext);

    useEffect(() => {
        const userData = localStorage.getItem("appUser", state);
        if(state.updatedAt) {
            localStorage.setItem("appUser", JSON.stringify(state));
        } else if(userData) {
            resetStore(dispatch)(JSON.parse(userData));
        }
    }, [state.updatedAt]);
    return (
        <Context.Provider
            value={{
                data: state,
                methods: {
                    getUsers: getUsers(dispatch),
                    getUser: getUser(dispatch),
                    createUser: createUser(dispatch),
                    login: login(dispatch),
                    isLoggedIn: isLoggedIn(state),
                    isAdmin: isAdmin(state),
                    signOut: signOut(dispatch),
                    sendEnquiery: sendEnquiery(dispatch),
                    updateProfile: updateProfile(dispatch),
                    changePassword: changePassword(dispatch),
                    deleteUser: deleteUser(dispatch),
                    updateUser: updateUser(dispatch),
                    signUp: signUp(dispatch),
                },
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useUser = () => useContext(Context);

export default UserContextProvider;