import React from "react";

const todoItem = props => {
  return (
    <li>
      <span>{props.title}</span>
    </li>
  );
};

export default todoItem;
