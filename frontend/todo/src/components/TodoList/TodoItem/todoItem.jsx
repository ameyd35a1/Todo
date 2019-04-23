import React from "react";
import "./todoItem.css";

const compareDates = setDate => {
  var q = new Date();
  var m = q.getMonth() + 1;
  var d = q.getDay();
  var y = q.getFullYear();

  var date = new Date(y, m, d);

  var todoDate = new Date(setDate);

  if (todoDate < date) {
    return 1;
  } else {
    return 0;
  }
};

const todoItem = props => {
  return (
    <li
      className={
        "card" +
        (compareDates(props.date) && !props.status ? " overdue" : "") +
        (props.status ? " completed" : "")
      }
      onClick={props.changeStatus.bind(this, props.id, !props.status)}
    >
      <div className="item">
        <span className="title">{props.title}</span>
        <span className="desc">{props.description}</span>
        <span className="date">{props.date}</span>
      </div>
    </li>
  );
};

export default todoItem;
