import {fromJS}from 'immutable';
import * as constants from './constants';

const defaultStatus=fromJS({
    login:false
})
export default (state=defaultState,action)=>{
    switch(action.state){
        case constants.CHANGE_LOGIN:
            return state.set('login',action.value);
        case constants.LOGOUT:
            return state.set('login',action.value);
        default:
            return state;
    }
}