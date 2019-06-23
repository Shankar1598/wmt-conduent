import { Menu } from "semantic-ui-react";
import { Layout} from "antd";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import FeedItem from "./FeedItem";

class Statistics extends React.Component {
  state = { data: [{ tax_name: "", amount: "",debitChain:[] }] };

  componentDidMount = async () => {
    this.setState({fetchData: true});
  };

  componentDidUpdate = async ()=>{
    // console.log(this.props.contract, this.state.fetchData)
    if(this.props.contract && this.state.fetchData ){
      const cfi_balance = await this.props.contract.methods.cfi_balance().call();
      const debitChainLength = await this.props.contract.methods.getChainOutLength().call();
      const debitChain = await Promise.all(
        Array(parseInt(debitChainLength))
          .fill()
          .map((element, index) => {
            return this.props.contract.methods.chainOut(index).call();
          })
      );
      if(debitChain){
               console.log(debitChain)   
               this.setState({fetchData: false, debitChain});
              }
    }
  }

  renderFeedItem = () =>{
    if(this.state.debitChain){
      return this.state.debitChain.reverse().map((debit,i)=>{
        return (
          <FeedItem key={i} debit={debit} />
        )
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ padding: 25, textAlign: "center", height: "10vh" }}>
          <h1>What's trending near you.</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "auto",
            height: "90vh"
          }}
        >
          <div style={{ width: "60%" }}>
            {this.renderFeedItem()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Statistics;
