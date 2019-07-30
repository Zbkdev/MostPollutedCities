import React from "react";
import "./citylist.css";

const CityList = props => {
  const cities = props.cities.map((city, index) => (
    <li className="fade-in" key={index}>
      <div className="city">{city.city}:</div>

      <div className="info">
        <span>{" " + city.value}</span>
        {" " + city.unit}
        <br />
        Mesurement local date:
        <br />
        <div>{city.date.local}</div>
      </div>
    </li>
  ));
  return <ul>{cities}</ul>;
};

export default CityList;
