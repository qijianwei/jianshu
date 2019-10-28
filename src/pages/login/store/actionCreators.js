import axios from 'axios';
import * as constants from './constants';

const changeLoginStatus=()=>({
   type:constants.CHANGE_LOGIN,
   value:true
})
export const logout=()=>({
  type:constants.LOGOUT,
  value:false
})
export const login=(account,password)=>{
    return (dispatch)=>{
        axios.get('/api/login.json?account='+account+'&password='+password).then((res)=>{
            const result=res.data.data;
            if(result){
                dispatch(changeLoginStatus());
            }else{
                console.warn(`登录失败`)
            }
        })
    }

}