import { CHANGECOUNT, CHANGCITY, CHANGEMSG, CHANGEWORD, CHANGEINP } from "../actions";


// reduce   
// reducers   this.setState()  

// Store 收到 Action 以后，必须给出一个新的 State，
// 这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

// Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

// reducer 纯函数  Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

// 负责计算初始化的  state 
import {combineReducers} from "redux";
import { count } from "./count";
import { city } from "./city";
import { msg } from "./msg";
import { word } from "./word";
import { data } from "./data";
const defaultState = {
    count:2020,
    city:"武汉wuhan",
    msg:"Are you Ok",
    word:"2020-一起快乐",
    data:{
        mv:[],
        inp:"1910-奋斗react"
    }
}

export const reducers = combineReducers({
    count:count,
    num:count,
    city:city,
    msg:msg,
    word:word,
    data:data,
})

// export const reducers = (state=defaultState,action) => {
//     console.log(action);
//     switch(action.type){

//         case "countAdd":
//         state.count++;
//         return state;
//         break;

//         case "countDesc":
//         state.count--;   // 原来的 state 对象操作 
//         return state;
//         break;

//         case CHANGECOUNT:
//         // state.count+=action.payload;
//         return {...state,count:state.count+action.payload}   // 返回新的 state 
//         break;

//         case CHANGCITY:
//         return {...state,city:action.payload}    // 要得到新的 State，唯一办法就是生成一个新对象
//         break;

//         case CHANGEMSG:
//         return {...state,msg:action.payload}
//         break;
        
//         case CHANGEWORD:
//         return {...state,word:action.payload}
//         break;

//         case CHANGEINP:
//         var time = new Date();
//         return {...state,data:{...state.data,inp:action.payload}};
//         break;


//         default:
//         return state;
//         break;
//     }
// }