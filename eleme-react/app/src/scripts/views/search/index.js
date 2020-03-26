import "./index.scss"
import React, { Component } from "react"
import Head from "~/components/head"
import {
    WingBlank,
    SearchBar
} from "antd-mobile"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"

export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            searchList: [],
            searchList1: [],
        }
    }
    handleSubmit(keyword) {
        console.log(keyword);
        axios.get(`/react/tuijian?keyword=${keyword}`).then(res => {
            console.log(res)
            this.setState({
                searchList: res.data.result
            })
        })

        axios.get(`/react/youhui?keyword=${keyword}`).then(res => {
            console.log(res)
            this.setState({
                searchList1: res.data.result
            })
        })

    }

    render() {
        // console.log(this.props)
        return (
            <div>
                <Head title="搜索" show={true} search={true} ></Head>
                <WingBlank>
                    <SearchBar placeholder="请输入关键字" onSubmit={this.handleSubmit.bind(this)} />
                </WingBlank>
                {
                    this.state.searchList.map((item, i) => {
                        console.log(item)
                        return (
                            <Link to="/detail" key={i} style={{ display: 'inline-block', width: '100%', }}>
                                <ul style={{ width: "100%", height: "100px" }}>
                                    <li style={{ width: "40%", height: "100px", float: "left" }}>
                                        <img src={item.img} style={{ width: "80%", height: "80px", margin: "0 auto" }} />
                                    </li>
                                    <li style={{ width: "60%", height: "100px", float: "left" }}>
                                        <h2 style={{ fontWeight: "600", height: "25px" }}>{item.name}</h2>
                                        <p style={{ fontSize: "13px", color: "gray", marginBottom: "5px" }}>{item.type}</p>
                                        <p style={{ fontSize: "12px", color: "gray", marginBottom: "5px" }}><span style={{ color: "red", marginRight: "10px" }}>{item.pinfen}分</span>月售{item.num}单</p>
                                        <p style={{ fontSize: "10px", color: "gray", marginBottom: "5px" }}>￥{item.money}元起送/配送费约{item.yunfei}<span style={{ color: "blue", marginLeft: "15px" }}>{item.lucheng}米/{item.time}分钟</span></p>
                                    </li>
                                </ul>
                            </Link>

                        )
                    })
                }

                {
                    this.state.searchList1.map((item, i) => {
                        console.log(item)
                        return (
                            <Link to="/detail" key={i} style={{ display: 'inline-block', width: '100%', }}>
                                <ul style={{ width: "100%", height: "100px" }}>
                                    <li style={{ width: "40%", height: "100px", float: "left" }}>
                                        <img src={item.img} style={{ width: "80%", height: "80px", margin: "0 auto" }} />
                                    </li>
                                    <li style={{ width: "60%", height: "100px", float: "left" }}>
                                        <h2 style={{ fontWeight: "600", height: "25px" }}>{item.name}</h2>
                                        <p style={{ fontSize: "13px", color: "gray", marginBottom: "5px" }}>{item.type}</p>
                                        <p style={{ fontSize: "12px", color: "gray", marginBottom: "5px" }}><span style={{ color: "red", marginRight: "10px" }}>{item.pinfen}分</span>月售{item.num}单</p>
                                        <p style={{ fontSize: "10px", color: "gray", marginBottom: "5px" }}>￥{item.money}元起送/配送费约{item.yunfei}<span style={{ color: "blue", marginLeft: "15px" }}>{item.lucheng}米/{item.time}分钟</span></p>
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




