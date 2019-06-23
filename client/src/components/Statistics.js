import { Menu, Segment } from "semantic-ui-react";
import { Icon, Layout, Progress, Breadcrumb, Button } from "antd";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import Chart from "react-chartjs";
const { Content } = Layout;
const { SubMenu } = Menu;
const LineChart = Chart.Line;

class Statistics extends React.Component {
  state = {
    fetchData: false,
    data: null,
    selectedState: [],
    selectedDistrict: [],
    selectedArea: [],
    options: {
      states: ["tamilnadu", "kerala", "andhrapradesh", "haryana"],
      tamilnadu: {
        districts: ["kancheepuram", "chennai"],
        kancheepuram: {
          locals: ["ramarajan street"]
        }
      },
      kerala: {
        districts: ["moonar"],
        moonar: {
          locals: ["end"]
        }
      }
    },
    creditChain: [],
    taxTypes: [
      { type: "it", text: "Income Tax", amount: 100, total: 200 },
      { type: "it", text: "Water Tax", amount: 100, total: 200 },
      { type: "it", text: "Property Tax", amount: 100, total: 200 },
      { type: "it", text: "GST", amount: 100, total: 200 }
    ]
  };  
  componentDidMount(){
    this.setState({fetchData: true});
  }
  componentDidUpdate = async ()=>{
    if(this.props.contract && this.state.fetchData ){
      const taxTypeSum = {}
      const cfi_balance = await this.props.contract.methods.cfi_balance().call();
      const creditChainLength = await this.props.contract.methods.getChainInLength().call();
      const creditChain = await Promise.all(
        Array(parseInt(creditChainLength))
          .fill()
          .map((element, index) => {
            return this.props.contract.methods.chainIn(index).call();
          })
      );
      if(creditChain){
        for(let i=0; i<creditChain.length; i++){
          if(taxTypeSum[creditChain[i].tax_type]!=null){
            taxTypeSum[creditChain[i].tax_type]+=parseInt(creditChain[i].amount);
          } else {
            taxTypeSum[creditChain[i].tax_type]=parseInt(creditChain[i].amount)
          }
        }
        this.setState({fetchData: false, creditChain, taxTypeSum, cfi_balance});
      }
    }
  }

  renderBreadCrumbs = crumbs => {
    crumbs = this.state.data;
    if (crumbs == null) {
      return <h3>Select any State</h3>;
    }
    return crumbs.map((crumb, i) => {
      return <Breadcrumb.Item key={i}>{crumb.name.toUpperCase()}</Breadcrumb.Item>;
    });
  };

  addSelected = (selected, type) => {
    let selectedOptions = this.state.data;
    if (selectedOptions === null) {
      selectedOptions = [];
    }

    selectedOptions.push({ name: selected, type: type });
    this.setState({ data: selectedOptions });
  };

  renderSegments = (options, type) => {
    return options.map((option,i) => {
      return (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            background: "#4183c4",
            height: 50,
            margin: 5,
            borderRadius: 7
          }}
          onClick={e => {
            this.addSelected(option, type);
          }}
        >
          <div style={{ padding: 20 }}>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: 20,
                fontWeight: "bolder",
                textTransform: "capitalize",
                cursor: "pointer"
              }}
            >
              {option}
            </p>
          </div>
        </div>
      );
    });
  };

  renderTaxTypes = () => {
   
    return this.state.creditChain.map((tax, i) => {
      let cfi_balance=this.state.cfi_balance;
      // let tax_val=this.state.taxTypeSum[tax.tax_type];
      let tax_val=tax.amount;
      let percent  = Math.floor((tax_val/cfi_balance)*100000)/100
      percent = percent>100 ? 80 : percent;
      // if(i==2) return null;
      console.log(cfi_balance);
      console.log(tax_val);
      console.log((tax_val/cfi_balance)*1000);
      // console.log(tax_val);
      return (

        <Segment style={{ margin: 0, marginLeft: 10 }} key={i}>
          <div
            style={{
              width: 350,
              height: 150,
              margin: 10,
              borderRadius: 15,
              flex: 1
            }}
          >
            <div>
              <h1>{tax.tax_type.toUpperCase()}</h1>
              <div>
                <h3>{tax.text}</h3>
                <h5>Tax Amount:{tax.amount}</h5>
                Percentage:
                {
                  <Progress
                    percent={
                      percent
                    }
                    showInfo={true}
                  />
                }
                
                {/* {console.log(this.state.taxTypeSum[tax.tax_type], Math.floor((this.state.cfi_balance / this.state.taxTypeSum[tax.tax_type]) * 10000)/100)} */}
               {/* {console.log(tax.tax_type, this.state.taxTypeSum[tax.tax_type])} */}
              </div>
            </div>
          </div>
        </Segment>
      );
    });
  };

  goBack = () => {
    let state = { ...this.state };

    if (state.data.length > 1) {
      state.data.pop();
      this.setState({ state });
    } else {
      this.setState({ data: null });
    }
  };

  renderOptions = () => {
    let districts_to_render = null;
    let locals_to_render = null;
    if (this.state.data) {
      let selected = this.state.data[this.state.data.length - 1];
      switch (selected.type) {
        case "states": {
          const selectedState = selected.name;
          districts_to_render = this.state.options[selectedState].districts;
          return this.renderSegments(districts_to_render, "districts");
        }
        case "districts": {
          const selectedState = this.state.data[this.state.data.length - 2]
            .name;
          const selectedDistrict = this.state.data[this.state.data.length - 1]
            .name;
          locals_to_render = this.state.options[selectedState][selectedDistrict]
            .locals;
          return this.renderSegments(locals_to_render, "locals");
        }
      }
    } else {
      return this.renderSegments(this.state.options.states, "states");
    }
  };
  render() {
    return (
      <React.Fragment>
        <Segment
          style={{ display: "flex", justifyContent: "space-between" }}
          className="segment-container"
        >
          <Breadcrumb>{this.renderBreadCrumbs()}</Breadcrumb>
          <Button onClick={() => this.goBack()}>Back</Button>
        </Segment>
        <Segment className="segment-container">
          <div style={{ display: "flex" }}>
            <div className="user-tabs">{this.renderOptions()}</div>
          </div>
        </Segment>

        <div style={{ display: "flex", flexWrap: "wrap", margin: 10 }}>
          {this.renderTaxTypes(this.state.taxTypes)}
        </div>
      </React.Fragment>
    );
  }
}
export default Statistics;
