import "./index.scss"
import React, {Component} from "react";
import Head from "~/components/head"
import {axios} from "&"
import {
    WingBlank,
    WhiteSpace,
    Card,
    Stepper,
    Button,
    Modal,
    Toast
} from "antd-mobile"
import {connect} from "react-redux"
import {history} from "&"
const alert = Modal.alert;

const showAlert = () => {
    const alertInstance = alert('提示', '你即将去购物车页面结算', [
      { text: '取消', onPress: () => console.log('取消操作'), style: 'default' },
      { text: '同意', onPress: () => history.push("/jiesuan") },
    ]);
    setTimeout(() => {
      // 可以调用close方法以在外部close
      console.log('auto close');
      alertInstance.close();
    }, 500000);
};
  


@connect(
    state=>{
        return {
            // pic:state.getIn(['user','pic'])
        }
    }
)
class Detail  extends Component{
    constructor(){
        super();
        this.state = {
            good:{},
            count:1
        }
    }

    componentDidMount(){
        const goodId  = this.props.location.search.split('?goodId=')[1];
        axios.get("/react/getGoodById",{
            params:{
                goodId
            }
        }).then(res=>{
            this.setState({
                good:res.data.result 
            })
        })
    }

    changeCount=(val)=>{
        console.log(val);
        this.setState({count:val})
    }

    addToCar=()=>{
        axios.get(`/react/addCart?count=${this.state.count}&goodId=${this.props.location.search.split('?goodId=')[1]}&mobile=${sessionStorage.mobile}&img=${this.state.good.img}&name=${this.state.good.name}&money=${this.state.good.money}`)
        .then(res=>{
            console.log(123456)
            console.log(res)
        })
    }

    // addToCar=()=>{
    //     // 加入购物车  
    //     axios.post("/react/addToShopcar",{
    //         count:this.state.count,
    //         good:this.state.good,
    //         goodId:this.props.match.params.goodId,
    //     }).then(res=>{
            
    //     })
    // }
    render(){
        const {
            location,
            match,
            pic
        }  = this.props;

        const {
            good
        }  = this.state;
        return (
            <div>
                <Head title="详情页" show={true}  ></Head>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                    <span style={{textAlign:"center",fontSize:"15px"}}>{good.name}</span>
                    <Card.Body>
                        {/* <p>{good.name}</p> */}
                        <div><img style={{width:"100%",height:"5rem"}} src={good.img} alt=""/></div>
                        <span style={{fontSize:"13px"}}>单价:{good.money}</span> <span style={{fontSize:"13px",color:"red"}}>评分:{good.pinfen}</span>
                    </Card.Body>
                    <Card.Footer content="点赞" extra={<div>收藏</div>} />
                    </Card>
                    <WhiteSpace size="lg" />
                    <div>
                    购买数量:
                    <Stepper
                        style={{ width: '50%', minWidth: '100px' }}
                        showNumber
                        min={1}
                        value={this.state.count}
                        onChange={this.changeCount}
                        />
                    </div>
                    <WhiteSpace size="lg" />
                    <Button type="warning" onClick={showAlert} > 立即购买 </Button>
                    <WhiteSpace size="lg" />
                    <Button type="primary" onClick={this.addToCar}>加入购物车</Button>
                </WingBlank>
            </div>
        )
    }
}

export default  Detail


