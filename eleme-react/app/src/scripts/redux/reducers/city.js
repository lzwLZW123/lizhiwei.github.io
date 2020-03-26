
import { CHANGECOUNT, CHANGCITY, CHANGEMSG, CHANGEWORD, CHANGEINP } from "../actions";
const defaultState = "大武汉-big"
export const city = (state = defaultState ,action)=>{
   
    switch(action.type){
        
        
        case CHANGCITY:
        return action.payload;    // 要得到新的 State，唯一办法就是生成一个新对象
        break;

        default:
        return state;
        break;
    }
}