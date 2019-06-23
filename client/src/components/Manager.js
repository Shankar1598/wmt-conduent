import { Menu, Segment, Form, Button } from "semantic-ui-react";
import { Icon, Layout, Progress, Breadcrumb, Tabs, Input } from "antd";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import Chart from "react-chartjs";
const { Content } = Layout;
const { SubMenu } = Menu;
const LineChart = Chart.Line;
const { TabPane } = Tabs;

class Manager extends React.Component {
  state = {
    selectedTab: "credit",
    id: "",
    amount:"",
    tax_type:"",
    credit_type:"",
    tax_head_code:"",
    area_code:"",
    debit_type: "tender",
    details:"",
    authority_id:""
  };

  callback = key => {
      console.log(key)
    this.setState({
      selectedTab: key,
      id: "",
      amount:"",
      tax_type:"",
      credit_type:"",
      tax_head_code:"",
      area_code:"",
      details:"",
      authority_id:""
    });
  };

  onChangeFormValues = (mode, value) => {
    let newState = this.state;
    newState[mode] = value;
    this.setState({ newState });
  };

  handleSubmit = async ()=>{
    //   console.log('hi');
      switch(this.state.selectedTab){
        case "credit":
        // console.log(this.state.account_address, this.state.booth_code)
        await this.props.contract.methods.creditTax(this.state.id, this.state.amount, this.state.tax_type, this.state.credit_type, this.state.tax_head_code).send({ from: this.props.accounts[0] });
        break;
      case "debit":
        // await this.props.contract.methods.registerControllingAuthority("1", "Nesamani", "Painting Contractor", "CH1").send({ from: this.props.accounts[0] });
        await this.props.contract.methods.debitTax(this.state.id, this.state.amount, this.state.area_code, this.state.debit_type, this.state.details, this.state.authority_id).send({ from: this.props.accounts[0] });
        break;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Segment className="segment-container">
          <h3>Manager</h3>
        </Segment>
        <Segment className="segment-container">
          <Tabs defaultActiveKey="credit" onChange={this.callback}>
            <TabPane tab="Credit Tax" key="credit">
              <Form>
                <Form.Group>
                  <Form.Input
                    onChange={e => {
                      this.onChangeFormValues("id", e.target.value);
                    }}
                    label="Aadhar Id"
                    value={this.state.id}
                    placeholder="Aadhar Id"
                    width={12}
                  />
                  <Form.Input
                    onChange={e => {
                      this.onChangeFormValues("amount", e.target.value);
                    }}
                    label="Tax Amount"
                    value={this.state.amount}
                    placeholder="Tax Amount"
                    width={12}
                  />
                  <Form.Input
                    onChange={e => {
                      this.onChangeFormValues("credit_type", e.target.value);
                    }}
                    value={this.state.credit_type}
                    label="Credit Type"
                    placeholder="Credit Type"
                    width={12}
                  />
                  <Form.Input
                    onChange={e => {
                      this.onChangeFormValues("tax_type", e.target.value);
                    }}
                    value={this.state.tax_type}
                    label="Tax Type"
                    placeholder="Tax Type"
                    width={12}
                  />
                    <Form.Input
                    onChange={e => {
                      this.onChangeFormValues("area_code", e.target.value);
                    }}
                    value={this.state.area_code}
                    label="Tax Head Code"
                    placeholder="Tax Head Code"
                    width={12}
                  />
                </Form.Group>
                <Button onClick={this.handleSubmit}>Submit</Button>
              </Form>
            </TabPane>
            <TabPane tab="Debit Tax" key="debit">
              <Form>
                <Form.Group>
                  <Form.Input
                    value={this.state.id}
                    onChange={e => {
                      this.onChangeFormValues(
                        "id",
                        e.target.value
                      );
                    }}
                    label="GSTIN"
                    placeholder="GSTIN"
                    width={12}
                  />
                  <Form.Input
                    value={this.state.amount}
                    onChange={e => {
                      this.onChangeFormValues("amount", e.target.value);
                    }}
                    label="Amount"
                    placeholder="Amount"
                    width={12}
                  />
                    <Form.Input
                    value={this.state.area_code}
                    onChange={e => {
                      this.onChangeFormValues("area_code", e.target.value);
                    }}
                    label="Area Code"
                    placeholder="Area Code"
                    width={12}
                  />
                    <Form.Input
                    value={this.state.details}
                    onChange={e => {
                      this.onChangeFormValues("details", e.target.value);
                    }}
                    label="Details"
                    placeholder="Details"
                    width={12}
                  />
                    <Form.Input
                    value={this.state.authority_id}
                    onChange={e => {
                      this.onChangeFormValues("authority_id", e.target.value);
                    }}
                    label="Authority ID"
                    placeholder="Authority ID"
                    width={12}
                  />
                </Form.Group>
                <Button onClick={this.handleSubmit}>Submit</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Segment>
      </React.Fragment>
    );
  }
}
export default Manager;
