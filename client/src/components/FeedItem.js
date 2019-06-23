import { Menu, Segment } from "semantic-ui-react";
import { Icon, Layout, Badge, Descriptions } from "antd";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import Chart from "react-chartjs";
const { Content } = Layout;
const { SubMenu } = Menu;
const LineChart = Chart.Line;

class Statistics extends React.Component {
  render() {
    console.log(new Date(parseInt(this.props.debit.timestamp)*1000),this.props.debit.timestamp)
    return (
      <Segment className="segment-container">
        <Descriptions title={""} bordered>
          <Descriptions.Item label="Debit ID">{this.props.debit[0]}</Descriptions.Item>
          <Descriptions.Item label="GSTN">{this.props.debit.gstin}</Descriptions.Item>
          <Descriptions.Item label="Company Name">Name from API</Descriptions.Item>
          <Descriptions.Item label="Start Time">
            {new Date(parseInt(this.props.debit.timestamp)*1000).toDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Authority ID" span={2}>
            {this.props.debit.authorityId}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Badge status="processing" text="Running" />
          </Descriptions.Item>
          <Descriptions.Item label="Amount">
            <strong>Rs. {this.props.debit.amount}</strong>
          </Descriptions.Item>
          <Descriptions.Item label="Area Code">{this.props.debit.areaCode}</Descriptions.Item>
          <Descriptions.Item label="Details" span={3}>
            {this.props.debit.details}
          </Descriptions.Item>
        </Descriptions>
      </Segment>
    );
  }
}
export default Statistics;
