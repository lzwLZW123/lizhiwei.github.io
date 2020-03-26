import "./index.scss"
import React, {Component} from "react"
import Head from "~/components/head"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {getgoodList1 } from "../../redux/actions";
@connect(
    state=>{
        console.log(state.data.goodList1)
        return{
            goodList1:state.data.goodList1
         }
    }
)
class Classify extends Component{
    componentDidMount(){
        this.props.dispatch(getgoodList1())
    }
    render(){
        const {goodList1}=this.props;
        return (
            <div style={{marginBottom:"40px"}}>
                <Head title="商家" show={true} ></Head>
                <h2 style={{color:"grey",fontSize:"15px",marginBottom:"15px",marginLeft:"13px",fontWeight:"600",marginTop:"10px"}}>推荐商家</h2> 
                {
                goodList1.map((item,i)=>{
                    return(
                        <Link to="/splist" key={i} style={{ display: 'inline-block', width: '100%',  }}>
                            <ul style={{width:"100%",height:"100px"}}>
                                <li style={{width:"40%",height:"100px",float:"left"}}>
                                    <img src={item.img} style={{width:"80%",height:"80px",margin:"0 auto"}}/>
                                </li>
                                <li style={{width:"60%",height:"100px",float:"left"}}>
                                    <h2 style={{fontWeight:"600",height:"25px"}}>{item.name}</h2>
                                    <p style={{fontSize:"13px",color:"gray",marginBottom:"5px"}}>{item.type}</p>
                                    <p style={{fontSize:"12px",color:"gray",marginBottom:"5px"}}><span style={{color:"red",marginRight:"10px"}}>{item.pinfen}分</span>月售{item.num}单</p>
                                    <p style={{fontSize:"10px",color:"gray",marginBottom:"5px"}}>￥{item.money}元起送/配送费约{item.yunfei}<span style={{color:"blue",marginLeft:"15px"}}>{item.lucheng}米/{item.time}分钟</span></p>
                                </li>
                            </ul>
                        </Link> 
                      
                    )
                })
                }
            </div>
        )
    }
}
export default Classify