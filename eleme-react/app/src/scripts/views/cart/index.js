

import "./index.scss"
import React, { Component } from "react"
import Head from "~/components/head"
import shopcar from "~/mobx/shopcar"
import { observer } from "mobx-react"
import {
    NoticeBar,
    Checkbox,
    Button
} from "antd-mobile"
// console.log(shopcar,15555555551111111111111111111111)
@observer
class Cart extends Component {

    componentDidMount() {
        shopcar.getCarList("/react/getCarList");
    }

    checkOne = e => {
        console.log(e);
        shopcar.changeOneChecked(e.target.checked, e.target.goodId);
    }

    checkAll = (e) => {
        console.log(e.target.checked);
        // shopcar.quan =   e.target.checked;
        shopcar.changeQuan(e.target.checked);
    }

    reduce = (goodId, count) => {
        if (count > 1) {
            shopcar.changeOneCount(goodId, false);
        }
    }

    add = (goodId, count) => {

        shopcar.changeOneCount(goodId, true);
    }

    changeCount = (goodId, v) => {
        console.log(v.target.value);
        if (v.target.value > 1) {
            shopcar.changeOneCountNum(goodId, v.target.value * 1)
        }
    }

    delSelect = () => {
        shopcar.delSelect();
    }

    render() {
        const {
            carList,
            carNum,
            total,
            quan
        } = shopcar;
        return (
            <div>
                <Head title="购物车" ></Head>
                <div style={{ display: sessionStorage.token ? 'none' : 'block' }} >
                    {/* <Button type="primary" onClick={()=>userInfo.countDesc(6)}> 你尚未登陆,请马上登录 </Button> */}
                    <Button type="primary" style={{fontSize:"20px",textAlign:"center",marginTop:"20px",color:"gray"}}> 你尚未登陆,请马上登录  </Button>
                </div>
                <div style={{ display: !sessionStorage.token ? 'none' : 'block' }}>
                    <div style={{ display: carList.length > 0 ? 'none' : 'block' }}>
                        <h2 style={{fontSize:"20px",textAlign:"center",marginTop:"20px",color:"gray"}}>购物车内暂无数据,请前往添加</h2>
                    </div>

                    <div style={{ display: !carList.length > 0 ? 'none' : 'block' }}  >
                        <div id="carDiv">
                            <div id="tbody" style={{marginBottom:"130px"}}>
                                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                                    即日起-2020.2.2，饿了吗庆周年活动正式开始，凡是消费，满50减10元，满100减25，满15减去40，满200减去60，200以上减去消费金额的20%，欢迎新老顾客速来抢购
                                </NoticeBar>
                                {
                                    carList && carList.map((i, index) => {
                                        console.log(i)
                                        return (
                                             <ul className="tr" key={index} id={i._id} style={{ width: "100%", height: "120px", background: "gray", marginBottom: "15px", marginTop: "15px" }}>
                                                <li style={{ width: "11%" }}>
                                                    <Checkbox
                                                        checked={i.checked}
                                                        goodId={i.goodId}
                                                        onChange={this.checkOne} >
                                                    </Checkbox>
                                                </li>
                                                <li style={{ width: "24%" }}><img src={i.img} style={{height:"80%"}} alt=""/></li>
                                                <li style={{ width: "38%" }}>
                                                    <p style={{ lineHeight: "18px", marginTop: '36px' }}>{i.name.slice(0, 6)}</p>
                                                    <p style={{ lineHeight: "18px" }}>￥{i.money}</p>
                                                </li>
                                                <li style={{ width: "26%" }}>
                                                    <span style={{ fontSize: '22px', marginRight: '3px' }} onClick={() => this.reduce(i.goodId, i.count)}>-</span>
                                                    <input goodsid={i.goodId} type="text" value={i.count} onChange={(v) => { this.changeCount(i.goodId, v) }} style={{ width: "54px", fontSize: '16px', textAlign: 'center', background: 'none', border: '0' }} />
                                                    <span style={{ fontSize: '22px' }} onClick={() => this.add(i.goodId, i.count)}>+</span>
                                                </li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                            <div className="carFoot">
                                <Checkbox style={{ width: '4%', float: 'left', marginLeft: '2%', lineHeight: '50px', }} onClick={this.checkAll} checked={quan} ></Checkbox>
                                <p onClick={this.delSelect} style={{ width: '28%', lineHeight: '50px', fontSize: '14px', color: "red", marginLeft: '4%' }} >删除选中</p>
                                <p style={{ width: '36%', lineHeight: '50px', color: "#fff" }}>
                                    商品总价:<span style={{ width: '100px', color: "red" }}> {total} </span>
                                </p>
                                <p style={{ backgroundColor: '#5c3715', width: "26%", fontSize: '20px', lineHeight: '50px', textAlign: 'center', color: "#fff", letterSpacing: '2px' }} >下单 {carNum} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;

// import "./index.scss"
// import React, { Component } from "react"
// import Head from "~/components/head"
// import shopcar from "~/mobx/shopcar"
// import { observer } from "mobx-react"
// import {
//     Checkbox,
//     Stepper
// } from "antd-mobile"

// @observer
// class Cart extends Component {
//     componentDidMount() {
//         shopcar.getCarList("/react/getCarList");
//     }

//     checkOne = e => {
//         console.log(e);
//         shopcar.changeOneChecked(e.target.checked, e.target.goodId);
//     }

//     render() {
//         const {
//             carList,
//             carNum,
//             total,
//             quan
//         } = shopcar;
//         return (
//             <div>
//                 <Head title="订单" ></Head>
                    // <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    //                 即日-01.26，购「布莱克/栗蓉暗香/松仁淡奶/核桃斯诺/布朗尼」，实付满200元，配送完成后赠21cake「肉桂卷」兑换券。
                    //             </NoticeBar>
//                 {carList && carList.map((i, index) => {
//                     return (
//                         <ul style={{ width: "100%", height: "120px", background: "gray", marginBottom: "15px", marginTop: "15px" }} key={index}>
//                             <li style={{ width: "20%", height: "100px", float: "left", paddingLeft: "30px", paddingTop: "40px" }}>
//                                 <Checkbox checked={i.checked}
//                                     goodId={i.goodId}
//                                     onChange={this.checkOne} ></Checkbox>
//                             </li>
//                             <li style={{ width: "40%", height: "100px", float: "left" }}>
//                                 <img src={i.img} style={{ width: "80%", height: "110px" }} />
//                             </li>
//                             <li style={{ width: "40%", height: "100px", float: "left", position: "relative" }}>
//                                 <h2 style={{ fontWeight: "600", height: "25px", fontSize: "15px", marginBottom: "10px" }}>{i.name}</h2>
//                                 <p style={{ fontSize: "15px", marginBottom: "10px" }}>单价{i.money}</p>
//                                 {/* <Stepper
//                                     style={{ width: '50%', minWidth: '100px' }}
//                                     showNumber
//                                     min={1}
//                                     value={i.count}
//                                     onChange={this.changeCount}
//                                 /> */}

//                                 <p style={{ width: "26%" }}>
//                                     <span style={{ fontSize: '22px', marginRight: '3px' }} onClick={() => this.reduce(i.goodId, i.count)}>-</span>
//                                     <input goodsid={i.goodId} type="text" value={i.count} onChange={(v) => { this.changeCount(i.goodId, v) }} style={{ width: "54px", fontSize: '16px', textAlign: 'center', background: 'none', border: '0' }} />
//                                     <span style={{ fontSize: '22px' }} onClick={() => this.add(i.goodId, i.count)}>+</span>
//                                 </p>
//                                 <button style={{ position: "absolute", right: "0px", top: "50%" }}>删除</button>
//                             </li>
//                         </ul>
//                     )
//                 })
//                 }
//                 <button style={{ position: "absolute", right: "0px", bottom: "120px", right: "0px", width: "70px", height: "30px" }}>全删</button>
//                 {<div style={{ width: "100%", height: "60px", position: "fixed", bottom: "50px", backgroundColor: "pink" }}>
//                     <div style={{ width: "30%", height: "60px", float: "left", backgroundColor: "red", textAlign: "center", lineHeight: "60px" }}>
//                         <Checkbox>全选</Checkbox>
//                     </div>
//                     <div style={{ width: "40%", height: "60px", float: "left", backgroundColor: "pink", textAlign: "center", lineHeight: "60px" }}>总计:12</div>
//                     <div style={{ width: "30%", height: "60px", float: "left", backgroundColor: "red", textAlign: "center", lineHeight: "60px" }}>去结算</div>
//                 </div>}
//             </div>
//         )
//     }
// }
// export default Cart








