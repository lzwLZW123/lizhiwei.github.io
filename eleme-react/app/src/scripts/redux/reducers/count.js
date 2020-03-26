
import { CHANGECOUNT, CHANGCITY, CHANGEMSG, CHANGEWORD, CHANGEINP } from "../actions";
// reducers 
export const count = (state = 2021 ,action)=>{
    
    switch(action.type){
        
        case "countAdd":
        return ++state;
        break;

        case "countDesc":
        // state.count--;   // 原来的 state 对象操作 
        return --state;
        break;

        case CHANGECOUNT:
        // state.count+=action.payload;
        // return {...state,count:state.count+action.payload}   // 返回新的 state 
        return state+action.payload;
        break;

        default:
        return state;
        break;
    }
}