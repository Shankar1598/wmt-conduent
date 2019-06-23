import { Menu, Segment, Form, Button } from "semantic-ui-react";
import { Icon, Layout, Progress, Breadcrumb, Tabs, Input } from "antd";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import Chart from "react-chartjs";
const { Content } = Layout;
const { SubMenu } = Menu;
const LineChart = Chart.Line;
const { TabPane } = Tabs;

class Administrator extends React.Component {
  state = {
    selectedTab: "credit",
    id: "",
    name: "",
    designation: "",
    branch_code: "",
    account_address: "0xf3d059cc30aa79528b352611ac90c88b5e70f6eb",
    booth_code: "CH1",
    treasury_code: ""
  };

  callback = key => {
    this.setState({
      selectedTab: key,
      id: "",
      name: "",
      designation: "",
      branch_code: "",
      account_address: "",
      booth_code: "",
      treasury_code: ""
    });
  };

  onChangeFormValues = (mode, value) => {
    let newState = this.state;
    newState[mode] = value;
    this.setState({ newState });
  };

  handleSubmit = async ()=>{
    switch(this.state.selectedTab){
      case "credit":
        console.log(this.state.account_address, this.state.booth_code)
        await this.props.contract.methods.registerCreditManager(this.state.account_address, this.state.booth_code).send({ from: this.props.accounts[0] });
        break;
      case "debit":
        await this.props.contract.methods.registerDebitManager(this.state.account_address, this.state.booth_code).send({ from: this.props.accounts[0] });
        break;
      case "authority":
        await this.props.contract.methods.registerControllingAuthority(this.state.id, this.state.name, this.state.designation, this.state.branch_code).send({ from: this.props.accounts[0] });
        break;
      case "area":
          // await this.props.contract.methods.addArea(this.state.areaCode, this.state.state, this.state.district, this.state.subDivision, this.state.locality, this.state.pincode).send({ from: this.props.accounts[0] });
          break;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Segment className="segment-container">
          <h3>Administrator</h3>
        </Segment>
        <Segment className="segment-container">
          <Tabs defaultActiveKey="credit" onChange={this.callback}>
            <TabPane tab="Register Authority" key="authority">
              <Form>
                <Form.Group>
                  <Form.Input
                    onChange={e => {
                      this.onChangeFormValues("id", e.target.value);
                    }}
                    label="Aadhar Id / GST No"
                    value={this.state.id}
                    placeholder="Aadhar Id / GST No"
                    width={12}
                  />
                  <Form.Input
                    onChange={e => {
                      this.onChangeFormValues("name", e.target.value);
                    }}
                    label="Name"
                    value={this.state.name}
                    placeholder="Name"
                    width={12}
                  />
                  <Form.Input
                    onChange={e => {
                      this.onChangeFormValues("designation", e.target.value);
                    }}
                    value={this.state.designation}
                    label="Designation"
                    placeholder="Designation"
                    width={12}
                  />
                  <Form.Input
                    onChange={e => {
                      this.onChangeFormValues("branch_code", e.target.value);
                    }}
                    value={this.state.branch_code}
                    label="Branch code"
                    placeholder="Branch code"
                    width={12}
                  />
                </Form.Group>
                <Button onClick={this.handleSubmit}>Submit</Button>
              </Form>
            </TabPane>
            <TabPane tab="Register Credit Manager" key="credit">
              <Form>
                <Form.Group>
                  <Form.Input
                    value={this.state.account_address}
                    onChange={e => {
                      this.onChangeFormValues(
                        "account_address",
                        e.target.value
                      );
                    }}
                    label="Account Address"
                    placeholder="Address"
                    width={12}
                  />
                  <Form.Input
                    value={this.state.booth_code}
                    onChange={e => {
                      this.onChangeFormValues("booth_code", e.target.value);
                    }}
                    label="Tax Booth Code"
                    placeholder="Booth Code"
                    width={12}
                  />
                </Form.Group>
                <Button onClick={this.handleSubmit}>Submit</Button>
              </Form>
            </TabPane>
            <TabPane tab="Register Debit Manager" key="debit">
              <Form>
                <Form.Group>
                  <Form.Input
                    value={this.state.account_address}
                    onChange={e => {
                      this.onChangeFormValues(
                        "account_address",
                        e.target.value
                      );
                    }}
                    label="Account Address"
                    placeholder="Address"
                    width={12}
                  />
                  <Form.Input
                    value={this.state.treasury_code}
                    onChange={e => {
                      this.onChangeFormValues("treasury_code", e.target.value);
                    }}
                    label="Treasury Code"
                    placeholder="Treasury Code"
                    width={12}
                  />
                </Form.Group>
                <Button onClick={this.handleSubmit} >Submit</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Segment>
      </React.Fragment>
    );
  }
}
export default Administrator;
