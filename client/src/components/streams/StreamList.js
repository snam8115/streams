import React, { Fragment } from "react";
import { fetchStreams } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      /* return (
        <div className="right floated content">
          <div class="ui vertical animated button primary" tabindex="0">
            <div class="hidden content">Edit</div>
            <div class="visible content">
              <i class="edit icon"></i>
            </div>
          </div>
          <div class="ui vertical animated button negative" tabindex="0">
            <div class="hidden content">Delete</div>
            <div class="visible content">
              <i class="trash icon"></i>
            </div>
          </div>
        </div>
      );*/
      return (
        <div className="right floated content">
          <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>
            <i className="edit icon"></i>Edit
          </Link>
          <Link
            className="ui button negative"
            to={`/streams/delete/${stream.id}`}
          >
            <i className="trash icon"></i>Delete
          </Link>
        </div>
      );
    }
  }
  renderCreateButton = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            <i className="video icon"></i> Create Stream
          </Link>
        </div>
      );
    }
  };
  renderList = () => {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon youtube" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <Fragment>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreateButton()}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { fetchStreams: fetchStreams })(
  StreamList
);
