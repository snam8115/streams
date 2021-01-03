import React, { Fragment, useEffect } from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import history from "../../history";
import { Link } from "react-router-dom";

const StreamDelete = (props) => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
    //console.log(props);
  }, []);
  // console.log(props);
  const deleteStreamAction = () => {
    props.deleteStream(props.match.params.id);
  };
  const actions = (
    <Fragment>
      <button className="ui green ok  button" onClick={deleteStreamAction}>
        <i className="checkmark icon"></i>
        Yes
      </button>
      <Link className="ui red  cancel  button" to="/">
        <i className="remove icon"></i>
        No
      </Link>
    </Fragment>
  );

  const renderContent = () => {
    if (!props.stream) return "Are you sure you want to delete the stream?";

    return `Are you sure you want to delete the stream with title: "${props.stream.title}"?`;
  };

  return (
    <div>
      <Modal
        stream={props.stream}
        title="Delete a Stream"
        content={renderContent()}
        actions={actions}
        onDismiss={() => history.push("/")}
      />
    </div>
  );
};

const maspStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(maspStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
