import * as constants from "./constants";



const defaultState={
    title:'',
    content:''
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case constants.CHANGE_DETAIL:
            return state.merge({
                title:action.title,
                content:action.content
            });
        default:
            return state;
            
    }
}