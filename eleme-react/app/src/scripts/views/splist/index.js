import "./index.scss"
import React, { Component } from "react"
import { Button } from "antd-mobile"
import Head from "~/components/head"
import { getdetaillist } from "../../redux/actions";
import { axios } from "&"
import {Link} from "react-router-dom"
import {
    WingBlank,
    WhiteSpace,
    Card,
    Stepper,
    // Button,
    Modal,
    Toast
} from "antd-mobile"
import { connect } from "react-redux"
import { history } from "&"
const alert = Modal.alert;

@connect(
    state => {
        // console.log(state.data.detailList)
        return {
            detailList: state.data.detailList
        }
    }
)
class Splist extends Component {
    componentDidMount() {
        console.log("1111")
        this.props.dispatch(getdetaillist())
    }
    constructor() {
        super();
        this.state = {
            // good:{},
            count: 1
        }
    }

    changeCount = (val) => {
        console.log(val);
        this.setState({ count: val })
    }

    render() {
        const { detailList } = this.props;
        return (
            <div>
                <Head title="菜单页" show={true} login={true} ></Head>
                <div style={{ width: "100%", height: "150px", position: "relative" }}>
                    <img src={require("@/assets/images/banner3.png")} style={{ width: "90%", height: "110px", margin: "0 auto" }} />
                    <img src={require("@/../public/img/lzw7.png")} style={{ width: "25%", height: "80px", position: "absolute", top: "70px", left: "38%" }} />
                </div>
                <p style={{ textAlign: "center", fontSize: "20px", color: "grey" }}>饥饿先生</p>
                <p style={{ textAlign: "center", fontSize: "12px", color: "gray", marginBottom: "10px" }}>评价4.6 月售654 蜂鸟快送约54分钟</p>
                <h2 style={{ marginLeft: "20px", fontSize: "15px", color: "black", marginBottom: "10px" }}>全国加盟热线: 400-7777-655</h2>
                {
                    detailList.map((item, i) => {
                        return (
                            <Link to={`/detail?goodId=${item._id}`} key={i} style={{ display: 'inline-block', width: '100%',  }}>
                                <ul style={{ width: "100%", height: "120px", position: "relative"}}>
                                    <li style={{ width: "40%", height: "100px", float: "left" }}>
                                        <img src={item.img} style={{ width: "80%", height: "100px", margin: "0 auto" }} />
                                    </li>
                                    <li style={{ width: "60%", height: "100px", float: "left" }}>
                                        <h2 style={{ fontWeight: "600", height: "25px", fontSize: "15px" }}>{item.name}</h2>
                                        <p style={{ fontSize: "14px", color: "gray", marginBottom: "10px" }}><span style={{ color: "red", marginRight: "10px" }}>{item.pinfen}分</span>月售{item.num}单</p>
                                        <p style={{ fontSize: "12px", color: "gray", }}>￥{item.money}</p>
                                        {/* <Stepper
                                            style={{ width: '40%', minWidth: '20px' }}
                                            showNumber
                                            min={1}
                                            value={this.state.count}
                                            onChange={this.changeCount}
                                        /> */}
                                        {/* <button style={{ position: "absolute", right: "0", bottom: "30px" }}>加入购物车</button> */}
                                    </li>
                                </ul>
                            </Link>
                        )
                    })
                }
                {/* <div style={{ width: "100%", height: "60px", position: "fixed", bottom: "0", backgroundColor: "pink" }}>
                    <div style={{ width: "30%", height: "60px", float: "left", backgroundColor: "red", textAlign: "center", lineHeight: "60px" }}>购物车:12</div>
                    <div style={{ width: "40%", height: "60px", float: "left", backgroundColor: "pink", textAlign: "center", lineHeight: "60px" }}>总计:12</div>
                    <div style={{ width: "30%", height: "60px", float: "left", backgroundColor: "red", textAlign: "center", lineHeight: "60px" }}>去结算</div>
                </div> */}
                {/* <WhiteSpace size="lg" />
                <Button type="warning"> 立即购买 </Button>
                <WhiteSpace size="lg" />
                <Button type="primary">加入购物车</Button> */}

            </div>
        )
    }
}

export default Splist