
import { CHANGECOUNT, CHANGCITY, CHANGEMSG, CHANGEWORD, CHANGEINP, CHANGEMV } from "../actions";
const defaultState = {
    mv:[],
    inp:"1910-奋斗react",
    comments:[],
    goodList:[],
    goodList1:[],
    detailList:[]
}


export const data = (state = defaultState ,action)=>{
    
    switch(action.type){
        
        case CHANGEINP:
        return {...state,inp:action.payload}
        break;

        case CHANGEMV:
        return {...state,mv:action.payload}
        break;

        case "changeMvAsync":
        return {...state,mv:action.payload}
        break;

        case "changeInpAsync":
        return {...state,inp:action.payload}
        break;

        case "getCommentsAsync":
        return {...state,comments:action.payload}
        break;
        
        case "getgoodList":
            // console.log(111)
            // console.log(action.payload)
        return {...state,goodList:action.payload}
        break;

        case "getgoodList1":
            // console.log(111)
            // console.log(action.payload)
        return {...state,goodList1:action.payload}
        break;

        case "getdetaillist":
            // console.log(111)
            // console.log(action.payload)
        return {...state,detailList:action.payload}
        break;

        default:
        return state;
        break;
    }
}