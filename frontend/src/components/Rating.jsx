import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span>
        {value >= 1 ? <FaStar color="#f8e825" /> :
        value >= 0.5 ? <FaStarHalfAlt color="#f8e825" /> :
        <FaRegStar />}
      </span>

      <span>
        {value >= 2 ? <FaStar color="#f8e825" /> :
        value >= 1.5 ? <FaStarHalfAlt color="#f8e825" /> :
        <FaRegStar />}
      </span>

      <span>
        {value >= 3 ? <FaStar color="#f8e825" /> :
        value >= 2.5 ? <FaStarHalfAlt color="#f8e825" /> :
        <FaRegStar />}
      </span>

      <span>
        {value >= 4 ? <FaStar color="#f8e825" /> :
        value >= 3.5 ? <FaStarHalfAlt color="#f8e825" /> :
        <FaRegStar />}
      </span>

      <span>
        {value >= 5 ? <FaStar color="#f8e825" /> :
        value >= 4.5 ? <FaStarHalfAlt color="#f8e825" /> :
        <FaRegStar />}
      </span>

      <span style={{ marginLeft: "8px" }}>{text}</span>
    </div>
  );
};

export default Rating;