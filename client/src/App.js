import React, { Component } from "react";
import wmt from "./contracts/wmt.json";
import getWeb3 from "./utils/getWeb3";
import Navbar from './components/NavBar';
import './styles/index.css'
import "./App.css";
import '../node_modules/antd/dist/antd.css';
import Dashboard from './components/Dashboard';
import Feed from './components/Feed';
import Statistics from "./components/Statistics";
import Authority from "./components/Authority";
import Administrator from "./components/Administrator";
import Manager from './components/Manager';
class App extends Component {
  state = { selectedNavMenu: 'administrator', web3: null, accounts: null, contract: null, adminAddress: null };

  selectNavState = (selected) =>{
    this.setState({selectedNavMenu:selected})
  }


  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = wmt.networks[networkId];
      const instance = new web3.eth.Contract(
        wmt.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // instance.options.address = '0x9d2f8b543c963006f1136d6d5056a0e439ee0394';
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    

    // await contract.methods.addManager('0xf3d059cc30aa79528b352611ac90c88b5e70f6eb', 'CH21').send({ from: accounts[0] });
    // await contract.methods.creditTax('9003175919', 5000000, 'direct', 'income_tax', 'CH21').send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const cfi_balance = await contract.methods.cfi_balance().call();
    // console.log(cfi_balance);
    // this.setState({ data: {...this.state.data, cfi_balance: cfi_balance} });
  };


  renderPages = () =>{
    switch(this.state.selectedNavMenu){
      case "dashboard":{
        return <Dashboard accounts={this.state.accounts} contract={this.state.contract} />
      }
      case "feed":{
        return <Feed accounts={this.state.accounts}  contract={this.state.contract} />
      }
      case "statistics": {
        return <Statistics accounts={this.state.accounts}  contract={this.state.contract} />
      }
      case "authority": {
        return <Authority accounts={this.state.accounts}  contract={this.state.contract} />
      }
      case "administrator": {
        return <Administrator accounts={this.state.accounts}  contract={this.state.contract} />
      }
      case "manager":{
        return <Manager accounts={this.state.accounts}  contract={this.state.contract} />
      }
    }
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <Navbar selectNavState={this.selectNavState} />
        <div style={{width:"100vw",height:"100vh"}} >
        {this.renderPages()}
        </div>
      </div>
    );
  }
}

export default App;
