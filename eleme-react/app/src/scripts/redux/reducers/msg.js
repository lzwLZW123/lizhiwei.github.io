import { CHANGECOUNT, CHANGCITY, CHANGEMSG, CHANGEWORD, CHANGEINP } from "../actions";
const defaultState = "Are you Ok。。。。"
export const msg = (state = defaultState ,action)=>{
    
    switch(action.type){
        case CHANGEMSG:
        return action.payload;
        break;
        
        default:
        return state;
        break;
    }
}