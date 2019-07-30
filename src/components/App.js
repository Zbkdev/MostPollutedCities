import React from "react";
import "./App.css";
import Input from "./Input.js";
import CityList from "./CityList.js";
import Smoke from "./Smoke.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      text: "PL",
      value: "PL",
      isLoading: false,
      animate: false,
      unit: "so2"
    };

    this.handleChange = this.handleChange.bind(this);
    this.filter = this.filter.bind(this);
  }

  handleCountryName = () => {
    if (this.state.text === "Poland") {
      this.setState({
        value: "PL"
      });
    }
    if (this.state.text === "Spain") {
      this.setState({
        value: "ES"
      });
    }
    if (this.state.text === "France") {
      this.setState({
        value: "FR"
      });
    }
    if (this.state.text === "Germany") {
      this.setState({
        value: "DE"
      });
    }
  };

  filter(value) {
    this.setState(
      {
        text: value
      },
      this.handleDatafetch
    );
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  }

  handleDatafetch = () => {
    fetch(
      `https://api.openaq.org/v1/measurements?country=${
        this.state.value
      }&limit=10&order_by=value&sort=desc&parameter=${this.state.unit}`
    )
      .then(response => response.json())
      .then(data => {
        const apiData = data.results;
        this.setState({
          cities: apiData
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.text !== this.state.text) {
      this.handleCountryName();
      this.handleDatafetch();
      this.filter();
      this.setState({
        animate: true
      });
      setTimeout(
        function() {
          this.setState({ animate: false });
        }.bind(this),
        1100
      );
    }
  }

  componentDidMount() {
    this.handleDatafetch();
  }

  render() {
    const { isLoading } = this.state;
    const cities = this.state.cities;

    return (
      <div className="App">
        <div className="App">
          <div className="container">
            <canvas id="myCanvas" />
            <Smoke />
            <div className="zz">
              <div className="radio-buttons">
                <label>
                  <input
                    type="radio"
                    name="unit"
                    value="so2"
                    checked={this.state.unit === "so2"}
                    onChange={this.handleChange}
                  />{" "}
                  so2
                </label>
                <label>
                  <input
                    type="radio"
                    name="unit"
                    value="pm25"
                    checked={this.state.unit === "pm25"}
                    onChange={this.handleChange}
                  />{" "}
                  pm25
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    name="unit"
                    value="pm10"
                    checked={this.state.unit === "pm10"}
                    onChange={this.handleChange}
                  />{" "}
                  pm10
                </label>

                <label>
                  <input
                    type="radio"
                    name="unit"
                    value="no2"
                    checked={this.state.unit === "no2"}
                    onChange={this.handleChange}
                  />{" "}
                  no2
                </label>
              </div>
              <Input
                onTextChange={this.filter}
                onCountrySelect={this.handleCountryName}
              />
            </div>

            <div className={this.state.animate ? "in-down" : null}>
              {isLoading ? (
                <div>loading..</div>
              ) : (
                cities && <CityList cities={cities} />
              )}
            </div>

            <div />
          </div>
          <footer>
            This is app shows ten most polluted cities from selected country
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
