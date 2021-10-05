import React from "react";

export default function Alert(props) {
  let word =
    props.alert !== null && props.alert.type === "danger" ? "error" : "success";
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show role=alert`}
        >
          <strong>{word.charAt(0).toUpperCase() + word.slice(1)}</strong>:{" "}
          {props.alert.msg}
        </div>
      )}
    </div>
  );
}
