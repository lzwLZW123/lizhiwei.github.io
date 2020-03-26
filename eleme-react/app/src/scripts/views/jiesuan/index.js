import "./index.scss"
import React, {Component} from "react"
import Head from "~/components/head"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
@connect(
    state=>{
        return{
         }
    }
)
class Jiesuan extends Component{
    componentDidMount(){
      
    }
    render(){
        return (
            <div style={{marginBottom:"40px"}}>
                <Head title="结算" show={true} ></Head>
                <h2>选择收货地址</h2> 
                <h2>1231555555555515555555</h2>
            </div>
        )
    }
}
export default Jiesuan