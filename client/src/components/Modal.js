import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active" onClick={props.onDismiss}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard  modal visible active"
      >
        <div className="ui icon header">
          <i className="trash icon"></i>
          {props.title}
        </div>
        <div className="content  middle">
          <p>{props.content}</p>
        </div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
