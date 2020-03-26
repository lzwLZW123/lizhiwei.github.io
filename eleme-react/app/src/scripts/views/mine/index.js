import "./index.scss"
import React, {Component} from "react"
import Head from "~/components/head"
import {
    Button
} from "antd-mobile"
import {axios} from "&"
import UploadImg from "~/components/uploadImg"
export default class Mine extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLogin:!!sessionStorage.token,
            mobile:null
        }
    }

    componentDidMount(){
        axios.post("/react/getMobile")
        .then(res=>{
            this.setState({
                mobile:res.data.result
            })
        })
    }

    handleGotoLogin=()=>{
        this.props.history.push("/login");
    }
    handleGotoZhuXiao=()=>{
        sessionStorage.token = "";
        sessionStorage.mobile = "";
    }
    render(){
        const {
            isLogin,
            mobile
        } = this.state;
        return (
            <div>
                <Head title="个人中心"></Head>
                {
                    isLogin&& <ul style={{width:"100%",height:"70px",backgroundColor:"#f666",borderTop:"1px solid grey"}}>
                    <li style={{width:"20%",height:"70px",float:"left",marginLeft:"20px"}}><UploadImg/></li>
                    <li style={{width:"60%",height:"70px",float:"left"}}>
                        <p style={{height:"70px",lineHeight:"50px",fontSize:"15px",color:"grey"}}><span>欢迎登录{mobile}</span>/<span onClick={this.handleGotoZhuXiao}>退出</span></p>
                    </li>
                </ul>
                }
                {
                    !isLogin&& <ul style={{width:"100%",height:"70px",backgroundColor:"#f666",borderTop:"1px solid grey"}}>
                        <p style={{height:"70px",lineHeight:"50px",fontSize:"15px",color:"red",textAlign:"center"}}><span>您还未登录,请先登录</span>/<span onClick={this.handleGotoLogin}>去登录</span></p>
                    </ul>
                }
                <ul style={{width:"100%",height:"70px",backgroundColor:"white",marginBottom:"20px"}}>
                    <li style={{width:"33%",height:"60px",float:"left",textAlign:"center",overflow:"hidden"}}>
                        <p style={{marginTop:"15px"}}><span style={{color:"#ff8826"}}>0</span>元</p>
                        <p style={{fontSize:"12px"}}>我的余额</p>
                    </li>
                    <li style={{width:"33%",height:"60px",float:"left",textAlign:"center",overflow:"hidden"}}>
                        <p style={{marginTop:"15px"}}><span style={{color:"#ff1818"}}>0</span>个</p>
                        <p style={{fontSize:"12px"}}>我的红包</p>
                    </li>
                    <li style={{width:"33%",height:"60px",float:"left",textAlign:"center",overflow:"hidden"}}>
                        <p style={{marginTop:"15px"}}><span style={{color:"#37be1c"}}>0</span>分</p>
                        <p style={{fontSize:"12px"}}>我的积分</p>
                    </li>
                </ul>
                <ul>
                    <li style={{height:"50px",width:"100%",float:"left",backgroundColor:"white",lineHeight:"50px",borderBottom:"1px solid grey",paddingLeft:"20px"}}>
                        <i className={"iconfont icon-dindan"} style={{paddingRight:"30px"}}></i>
                        <span>我的订单</span>
                        </li>
                    <li style={{height:"50px",width:"100%",float:"left",backgroundColor:"white",lineHeight:"50px",borderBottom:"1px solid grey",paddingLeft:"20px"}}>
                    <i className={"iconfont icon-dizhiguanli"} style={{paddingRight:"30px"}}></i>
                        <span>地址管理</span>
                        </li>
                    <li style={{height:"50px",width:"100%",float:"left",backgroundColor:"white",lineHeight:"50px",borderBottom:"1px solid grey",paddingLeft:"20px"}}>
                        <i className={"iconfont icon-huiyuanqia"} style={{paddingRight:"30px"}}></i>
                        <span>饿了么会员卡</span>
                        </li>
                    <li style={{height:"50px",width:"100%",float:"left",backgroundColor:"white",lineHeight:"50px",borderBottom:"1px solid grey",paddingLeft:"20px"}}>
                        <i className={"iconfont icon-fuwuzhongxin"} style={{paddingRight:"30px"}}></i>
                        <span>服务中心</span>
                        </li>
                    <li style={{height:"50px",width:"100%",float:"left",backgroundColor:"white",lineHeight:"50px",borderBottom:"1px solid grey",paddingLeft:"20px"}}>
                        <i className={"iconfont icon-xiazaiapp"} style={{paddingRight:"30px"}}></i>
                        <span>下载饿了么App</span>
                        </li>
                </ul>
                
            </div>
        )
    }
}