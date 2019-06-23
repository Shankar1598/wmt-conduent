import {Segment } from 'semantic-ui-react'
import {Progress} from 'antd';
import 'semantic-ui-css/semantic.min.css';
import wmt from "../contracts/wmt.json";
import getWeb3 from "../utils/getWeb3";
import React from 'react';
import Chart from 'react-chartjs';
const LineChart = Chart.Line;

const indirectTaxData = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(17, 1, 127, 0)",
        strokeColor: "#b1e7ef",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "My Second dataset",
        fillColor: "rgba(170, 8, 8, 0)",
        strokeColor: "white",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

const others = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(17, 1, 127, 0)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "My Second dataset",
        fillColor: "rgba(170, 8, 8, 0)",
        strokeColor: "white",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

const directTaxData = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(17, 1, 127, 0)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "My Second dataset",
        fillColor: "rgba(170, 8, 8, 0)",
        strokeColor: "white",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(17, 1, 127, 0.22)",
        strokeColor: "rgba(17, 1, 127, 0.66)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "My Second dataset",
        fillColor: "rgba(170, 8, 8, 0.22)",
        strokeColor: "rgba(170, 8, 8, 0.66)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };
class Dashboard extends React.Component {

  state={directSum:0,indirectSum:0,debitSum:0}
  componentDidMount = async () => {
    this.setState({fetchData: true});
  };

  componentDidUpdate = async ()=>{
    if(this.props.contract && this.state.fetchData){
      let debitSum = 0, directSum=0, indirectSum=0;
      const cfi_balance = await this.props.contract.methods.cfi_balance().call();
      const debitChainLength = await this.props.contract.methods.getChainOutLength().call();
      
      const debitChain = await Promise.all(
        Array(parseInt(debitChainLength))
          .fill()
          .map((element, index) => {
            return this.props.contract.methods.chainOut(index).call();
          })
      );
      console.log(debitChainLength);
      console.log(cfi_balance);
      for(let i=0; i< debitChain.length; i++){
        debitSum+= parseInt(debitChain[i].amount);
      }
      const creditChainLength = await this.props.contract.methods.getChainInLength().call();
      const creditChain = await Promise.all(
        Array(parseInt(creditChainLength))
          .fill()
          .map((element, index) => {
            return this.props.contract.methods.chainIn(index).call();
          })
      );
      for(let i=0; i< creditChain.length; i++){
        if(creditChain[i].tax_type=='gst'){
          indirectSum+=parseInt(creditChain[i].amount);
        } else {
          directSum+=parseInt(creditChain[i].amount);
        }
      }
      
      this.setState({fetchData: false, cfi_balance, debitSum, directSum, indirectSum});
    }
  }

    render() {  
      return (
        <React.Fragment>
            <Segment className="segment-container">
                <div className="user-tabs" >
                    <div style={{width:"100%",background:"linear-gradient(to right, rgba(210,255,82,1) 0%, rgba(145,232,66,1) 100%)",height:250, margin:20, borderRadius:15}}>
                        <div id="tab-label" style={{padding:20}} >
                            <h2 style={{color:"white", fontSize:33,fontWeight:"bolder"}} >Direct Tax</h2>
                        </div>
                        <div className="graph-holder" >
                            <LineChart data={directTaxData} options={{scaleShowGridLines : false,scaleShowLabels : false}}  width="350" height="130"/>
                            <div>
                                <h1 className="tax-amount">{this.state.directSum}</h1>
                            </div>
                        </div>
                    </div>
                    <div style={{width:"100%",background:"linear-gradient(to right, rgba(147,206,222,1) 0%, rgba(117,189,209,1) 41%, rgba(73,165,191,1) 100%)",height:250, margin:20,borderRadius:15}}>
                    <div id="tab-label" style={{padding:20}} >
                            <h2 style={{color:"white", fontSize:33,fontWeight:"bolder"}} >Indirect Tax</h2>
                        </div>
                        <div className="graph-holder" >
                            <LineChart data={indirectTaxData} options={{scaleShowGridLines : false,scaleShowLabels : false}}  width="350" height="130"/>
                            <div>
                                <h1 className="tax-amount">{this.state.indirectSum}</h1>
                            </div>
                        </div>
                    </div>
                    <div style={{width:"100%",background:"linear-gradient(to right, rgba(255,175,75,1) 0%, rgba(255,146,10,1) 100%)",height:250, margin:20,borderRadius:15}}>
                    <div id="tab-label" style={{padding:20}} >
                            <h2 style={{color:"white", fontSize:33,fontWeight:"bolder"}} >Debit</h2>
                        </div>
                        <div className="graph-holder" >
                            <LineChart data={directTaxData} options={{scaleShowGridLines : false,scaleShowLabels : false}}  width="350" height="130"/>
                            <div>
                                <h1 className="tax-amount">{this.state.debitSum}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </Segment>
             <Segment className="segment-container">
                <div>
                    <div className="header" >
                        <h3>Consolidated Fund Of India: Balance - Rs. {this.state.cfi_balance}</h3>
                    </div>
                <Progress strokeWidth={15} percent={
                  Math.floor((parseInt(this.state.cfi_balance)/(parseInt(this.state.directSum)+parseInt(this.state.indirectSum)))*10000)/100
                } showInfo={true} strokeColor={"linear-gradient(to right, rgba(73,155,234,1) 0%, rgba(32,124,229,0.63) 100%)"} style={{paddingRight: 20}} />
                <Progress percent={
                  Math.floor((parseInt(this.state.debitSum))/parseInt(this.state.cfi_balance)*10000)/100
                } strokeWidth={15} showInfo={true} strokeColor={"red"} style={{paddingRight: 20}} />
                </div>
            </Segment>
            <Segment className="segment-container" >
            <div className="header">
                <h3> Credit / Debit Transactions </h3>
            </div>
            <LineChart data={data}  width={window.innerWidth*90/100} height="350"/>
            </Segment>
        </React.Fragment>
      )
    }
}
 export default Dashboard;