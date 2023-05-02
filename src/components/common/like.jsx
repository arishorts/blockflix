import React from "react";
//input: liked boolean
//output: onClick

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) {
    classes += "-o";
  }
  return (
    <i
      onClick={props.onClick}
      className={classes}
      style={{ cursor: "pointer", outline: "none", userSelect: "none" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
