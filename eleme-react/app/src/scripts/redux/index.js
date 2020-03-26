


import React from "react"
import ReactDOM from "react-dom";
import CounterDemo from "./components"
import store from "./store"
console.log(store);

const value = store.getState();  // 对 store 生成临时的快照  得到临时的 state (oldState)  执行1次

export default class ReduxDemo extends React.Component{
    render(){
        
        return (
            <div>
                <h2>redux --- 数据管理</h2>
                <h2>state 共享   数据缓存 </h2>
                <hr/>
                <CounterDemo
                    value={value}
                    {... store.getState()}  
                ></CounterDemo>
            </div>
        )
    }
}


const hotRender = ()=>{
    ReactDOM.render(
        <ReduxDemo/>,
        document.getElementById('root')
    )
}

hotRender();
store.subscribe(hotRender);  // 监听 state  state 改变 触发这个函数 从而刷新视图 view
