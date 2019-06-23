import { Menu, Segment } from "semantic-ui-react";
import { Icon, Layout, Progress, Breadcrumb } from "antd";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import Chart from "react-chartjs";
const { Content } = Layout;
const { SubMenu } = Menu;
const LineChart = Chart.Line;

class Statistics extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Segment className="segment-container">Authority</Segment>
        <Segment className="segment-container">
          <div>
            <div style={{margin:10}} >
              <h3>Name: Nesamani</h3>
            </div>
            <div style={{margin:10}}>
              <h4>Id: 493348dk_fjdjd943</h4>
            </div>
            <div style={{margin:10}}>
              <h4>
                Designation: Painting Contractor
              </h4>
            </div>
            <div style={{margin:10}}>
              <h4>
                Branch Code: 98789
              </h4>
            </div>
          </div>
        </Segment>
      </React.Fragment>
    );
  }
}
export default Statistics;
