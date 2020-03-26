import React, {Component} from "react"
import store from "../store"
import {Button} from "antd-mobile"
import { countDesc, changeCount, changeCity, changeMsg, changeWord, changeInp, changeMV, changeMvAsync, changeInpAsync, getCommentsAsync } from "../actions";
import {axios} from "&";

export default class CounterDemo extends Component{

    handleChange(e){
        store.dispatch(changeWord(e.target.value))
    }

    handleChangeInp=()=>{
        axios.get("/react/index")
        .then(res=>{
            store.dispatch(changeInp(res.data.msg))
        })
    }

    componentDidMount(){
        // axios.get("/vue/maizuo/banner")
        // .then(res=>{
        //     store.dispatch(changeMV(res.data.result.data));
        // })
    }

    render(){
        const {
            value,
            count,
            msg,
            city,
            data:{
                mv,
                inp,
                comments
            }
        } = this.props;
        console.log(this.props);
        const state = store.getState();
        return (
            <div>
                <h2> redux -demo </h2>
                <h2>counter -- 计数器</h2>
                <h2>count === {value.count}  -- {count}  --- {state.count}</h2>
                <h2>city === {city} -- {state.city}</h2>
                <h2>msg == {msg}=={state.msg}</h2>
                <h2>word == {state.word}</h2>
                <h2>inp==={inp}</h2>
                <hr/>
                <Button onClick={()=>store.dispatch({type:"countAdd"})} inline  type="warning" >count add</Button>
                <Button onClick={()=>store.dispatch(countDesc)} inline  type="warning" >count desc</Button>
                <Button onClick={()=>store.dispatch(changeCount(10))} inline  type="primary" >count change 10</Button>
                <Button onClick={()=>store.dispatch(changeCity('温柔~北海道...'))} inline  type="primary" >change city</Button>
                <Button onClick={()=>store.dispatch(changeMsg('wuhan1910-新年快乐'))} inline  type="primary" >change msg</Button>
                <p> 
                    <input type="text" ref={el=>this.inp=el} value={state.word} onChange={this.handleChange}  />
                </p>
                <Button onClick={()=>store.dispatch(changeInp("努力一定就会成功!"))} inline  type="warning" >change inp </Button>
                <Button onClick={this.handleChangeInp} inline  type="warning" >change inp ajax </Button>
                <Button onClick={()=>store.dispatch(changeMvAsync({url:"/vue/maizuo/banner"}))} inline  type="warning" >get mv async</Button>
                <Button onClick={()=>store.dispatch(changeInpAsync({url:'/react/index',cb(){console.log("end====inp") }   }))} inline  type="warning" >get inp async</Button>

                {
                    mv.map((m,i)=>{
                        return (
                            <p key={i}> {m.name}</p>
                        )
                    })
                }
                <Button onClick={()=>store.dispatch( getCommentsAsync({url:'/react/getComments'}) )} inline  type="warning" >get comments async</Button>
                {
                    comments.map((mt,i)=>{
                        return (
                            <p key={i}>{mt.title}---{mt.content}</p>
                        )
                    })
                }
            </div>
        )
    }
}