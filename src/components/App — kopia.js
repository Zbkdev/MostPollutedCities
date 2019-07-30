import React from "react";
import "./App.css";
import Input from "./Input.js";
import CityList from "./CityList.js";
import Smoke from "./Smoke.js";

class App extends React.Component {
  state = {
    cities: [],

    value: "PL",
    label: "PL"
  };

  handleCountryName = () => {
    if (this.state.value === "PL") {
      this.setState({
        label: "POLAND"
      });
    }
  };

  filter = value => {
    this.setState(
      {
        value
      },
      this.handleDatafetch
    );
  };

  handleDatafetch = () => {
    fetch(
      `https://api.openaq.org/v1/locations?country=${
        this.state.value.label
      }&limit=10`
    )
      .then(response => response.json())
      .then(data => {
        const apiData = data.results;
        this.setState({ cities: apiData });
      });
  };

  componentDidMount() {
    this.handleDatafetch();
  }

  render() {
    const cities = this.state.cities;

    return (
      <div className="App">
        <canvas id="myCanvas" />
        <div className="container">
          <div>{this.state.label}</div>
          <Input onTextChange={this.filter} value={this.state.value} />
          {cities && <CityList cities={cities} />}
          <div />
        </div>
        <footer>this is app to bla bla bla and something else</footer>
      </div>
    );
  }
}

export default App;
