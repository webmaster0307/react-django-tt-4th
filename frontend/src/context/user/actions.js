import * as API from './api';
import ROLE from '../../utils/constants/role';
import { toast } from 'react-toastify';
import { history } from '../..';

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const CREATE_USER = 'CREATE_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const RESET_STORE = 'RESET_STORE';
export const SEND_ENQUIERY_SUCCESS = 'SEND_ENQUIERY_SUCCESS';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';


export const signOut = dispatch => async => {
  localStorage.removeItem('token');
  dispatch({
    type: SIGN_OUT,
  });
  toast.success("Signout Success!");
  history.push("/");
}

export const signUp = dispatch => async data => {
  try {
    await API.signUp(data);
    toast.success("Signup Success!");
    history.push("/login");
  } catch (e) {
    toast.error("Signup Error");
  }
}

export const getUsers = dispatch => async (params) => {
  try {
    const { data } = await API.getUsers(params);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: { data, params: { ...params, page: Math.min(params.page, Math.ceil(data.count / 10))} },
    })
  } catch {

  }
}

export const createUser = dispatch => async (data) =>{
  try {
    await API.createUser(data);
    toast.success("User Create Success!");
    history.push("/users");
  } catch (e) {
    if(e.email) {
      toast.error(e.email[0]);
    } else {
      toast.error("User Create Failed!");
    }
  }
}

export const deleteUser = dispatch => async (data) =>{
  try {
    await API.deleteUser(data);
    toast.success("User Delete Success!");
    history.push("/users");
  } catch (e) {
    if(e.email) {
      toast.error(e.email[0]);
    } else {
      toast.error("User Delete Failed!");
    }
  }
}

export const login = dispatch => async (data) => {
  dispatch({
    type: LOGIN_REQUEST
  });
  try {
    let result = await API.login(data);
    const { access } = result.data;
    localStorage.setItem("token", access);
    result = await API.getProfile();
    history.push("/");
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
    toast.success("Login Success!");
  } catch (e) {
    localStorage.removeItem("token");
    toast.error("Login Failure!");
    dispatch({
      type: LOGIN_FAILURE,
    })
  }
}

export const updateUser = dispatch => async (id, payload) => {
  try {
    let { data } = await API.updateUser(id, payload);
    toast.success("User Update Success!");
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (e) {
    console.log(e)
    toast.error("User Update Failure!");
  }
}

export const updateProfile = dispatch => async (payload) => {
  try {
    let { data } = await API.updateProfile(payload);
    toast.success("Profile Update Success!");
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (e) {
    console.log(e)
    toast.error("Profile Update Failure!");
  }
}

export const resetStore = dispatch => async (data) => {
  dispatch({
    type: RESET_STORE,
    payload: data,
  });
}

export const isLoggedIn = state => () => {
  const isLoggedIn = !!state.currentUser.id;
  return isLoggedIn;
}

export const getUser = dispatch => async (id) => {
  try {
    const { data } = await API.getUser(id);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    })
    return data;
  } catch {
    dispatch({
      type: GET_USER_SUCCESS,
      payload: null,
    })
    toast.error("Error in feteching user profile!");
  }
}

export const changePassword = dispatch => async data => {
  try {
    await API.changePassword(data);
    toast.success("Password Change Success!");
  } catch (e) {
    console.log("Passowrd Change Error...", e);
    toast.error("Password Change Failure!");
  }
}

export const sendEnquiery = dispatch => async (userId, content) => {
  try {
    const { data } = await API.sendEnquiry(userId, content);
    dispatch({
      type: SEND_ENQUIERY_SUCCESS,
      payload: data,
    });
    toast.success("Your message was delivered successfully.");
  } catch {
    toast.error("Message deliver failure");
  }
}

export const isAdmin = state => () =>  state.currentUser && state.currentUser.role === ROLE.Admin;