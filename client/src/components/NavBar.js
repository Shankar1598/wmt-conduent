import { Menu } from "semantic-ui-react";
import { Icon } from "antd";
import "semantic-ui-css/semantic.min.css";
import React from "react";
const { SubMenu } = Menu;

class NavBar extends React.Component {
  state = { activeItem: "administrator" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.selectNavState(name);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu style={{ margin: 0 }} id="navbar" icon="labeled" vertical>
        <Menu.Item
          name="dashboard"
          active={activeItem === "dashboard"}
          onClick={this.handleItemClick}
        >
          <div id="menu-item-container">
            <div className="icon-holder">
              {" "}
              <Icon style={{ fontSize: 24 }} type="bar-chart" />
            </div>
            Dashboard
          </div>
        </Menu.Item>
        <Menu.Item
          name="statistics"
          active={activeItem === "statistics"}
          onClick={this.handleItemClick}
        >
          <div id="menu-item-container">
            <div className="icon-holder">
              <Icon style={{ fontSize: 24 }} type="line-chart" />
            </div>
            Statistics
          </div>
        </Menu.Item>
        <Menu.Item
          name="feed"
          active={activeItem === "feed"}
          onClick={this.handleItemClick}
        >
          <div id="menu-item-container">
            <div className="icon-holder">
              <Icon style={{ fontSize: 24 }} type="pic-left" />
            </div>
            Feed
          </div>
        </Menu.Item>
        <Menu.Item
          name="authority"
          active={activeItem === "authority"}
          onClick={this.handleItemClick}
        >
          <div id="menu-item-container">
            <div className="icon-holder">
              <Icon style={{ fontSize: 24 }} type="user" />
            </div>
            Authority
          </div>
        </Menu.Item>
        <Menu.Item
          name="administrator"
          active={activeItem === "administrator"}
          onClick={this.handleItemClick}
        >
          <div id="menu-item-container">
            <div className="icon-holder">
              <Icon style={{ fontSize: 24 }} type="user-add" />
            </div>
            Administrator
          </div>
        </Menu.Item>
        <Menu.Item
          name="manager"
          active={activeItem === "manager"}
          onClick={this.handleItemClick}
        >
          <div id="menu-item-container">
            <div className="icon-holder">
              <Icon style={{ fontSize: 24 }} type="user-add" />
            </div>
            Manager
          </div>
        </Menu.Item>
      </Menu>
    );
  }
}
export default NavBar;
