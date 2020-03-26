import "./index.scss"
import React, { Component } from "react"
import Head from "~/components/head";
import { axios } from "&";
import {connect} from "react-redux"
import {
    WingBlank,
    Carousel,
    // WhiteSpace,
    
    // Accordion,
    // List,
    // Flex
} from "antd-mobile"
import {Link} from "react-router-dom"
import { getgoodList } from "../../redux/actions";
@connect(
    state=>{
        console.log(state.data.goodList)
        return{  
            goodList:state.data.goodList
        }

    }
)
 class Home extends Component {
    constructor() {
        super();
        this.state = {
            imgs: [
                require("@/assets/images/banner1.png"),
                require("@/assets/images/banner2.png"),
                require("@/assets/images/banner3.png")
            ]
        }
    }
    componentDidMount(){
        this.props.dispatch(getgoodList()) 
    }
    render() {
        const {goodList}=this.props;
        return (
            <div style={{marginBottom:"40px"}}>
                <Head title="首页"></Head>
                <WingBlank style={{width:"100%",margin:0}}>
                    <Carousel
                        autoplay={true}
                        infinite
                    >
                        {
                            this.state.imgs.map((item, i) => {
                                // console.log(this.state)
                                return (
                                    <Link to="/" key={i} style={{ display: 'inline-block', width: '100%', height: "120px" }}>
                                        <img
                                            src={item}
                                            alt=""
                                            style={{ width: '100%', height: "120px", verticalAlign: 'top' }}
                                            onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                            }}
                                        />
                                    </Link>
                                )
                            })
                        }
                    </Carousel>
                </WingBlank>

                {/* <h2>您好</h2> */}
                {/* <img src={require("@/../public/img/lzw1.png")}/> */}
                {/* 第二部分分类 */}
                <ul style={{marginBottom:"10px",height:"150px",marginTop:"10px"}}>
                    <li style={{width:"20%",float:"left"}}>
                        <img src={require("@/../public/img/lzw1.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                        <p style={{textAlign:"center"}}>美食</p>
                    </li>
                    <li style={{width:"20%",float:"left"}}>
                        <img src={require("@/../public/img/lzw2.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                        <p style={{textAlign:"center"}}>晚餐</p>
                    </li>
                    <li style={{width:"20%",float:"left"}}>
                        <img src={require("@/../public/img/lzw3.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                        <p style={{textAlign:"center"}}>水果</p>
                    </li>
                    <li style={{width:"20%",float:"left"}}>
                        <img src={require("@/../public/img/lzw4.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                        <p style={{textAlign:"center"}}>医药健康</p>
                    </li>
                    <li style={{width:"20%",float:"left"}}>
                        <img src={require("@/../public/img/lzw5.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                        <p style={{textAlign:"center"}}>浪漫鲜花</p>
                    </li>
                    <li style={{width:"20%",float:"left"}}>
                        <img src={require("@/../public/img/lzw6.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                        <p style={{textAlign:"center"}}>厨房生鲜</p>
                    </li>
                    <li style={{width:"20%",float:"left"}}>
                        <img src={require("@/../public/img/lzw7.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                        <p style={{textAlign:"center"}}>商超便利</p>
                    </li>
                    <li style={{width:"20%",float:"left"}}>
                        <img src={require("@/../public/img/lzw8.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                        <p style={{textAlign:"center"}}>地方小吃</p>
                    </li>
                    <li style={{width:"20%",float:"left"}}>
                        <img src={require("@/../public/img/lzw9.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                        <p style={{textAlign:"center"}}>麻辣烫</p>
                    </li>
                    <li style={{width:"20%",float:"left"}}>
                        <img src={require("@/../public/img/lzw10.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                        <p style={{textAlign:"center"}}>跑腿代购</p>
                    </li>
                </ul>

                {/* 第三部分 */}
               <ul style={{height:"120px"}}>
                    <li style={{width:"50%",float:"left"}}>
                        <img src={require("@/../public/img/lzw11.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                    </li>
                    <li style={{width:"50%",float:"left"}}>
                        <img src={require("@/../public/img/lzw12.png")} style={{width:"80%",margin:"0 auto"}} alt=""/>
                    </li>
               </ul>
               <h2 style={{color:"red",fontSize:"20px",marginBottom:"15px",marginLeft:"13px",fontWeight:"600"}}>优惠专区</h2> 

                {/* 优惠区 */}
                {
                goodList.map((item,i)=>{
                    return(
                        <Link to="/splist" key={i} style={{ display: 'inline-block', width: '100%',  }}>
                            <ul style={{width:"100%",height:"100px"}}>
                                <li style={{width:"40%",height:"100px",float:"left"}}>
                                    <img src={item.img} style={{width:"80%",height:"80px",margin:"0 auto"}} alt=""/>
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

export default  Home