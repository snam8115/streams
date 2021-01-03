import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";

import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildVideoPlayer();
  }
  componentDidUpdate() {
    this.buildVideoPlayer();
  }

  componentWillUnmount() {
    this.videoPlayer.destroy();
  }
  buildVideoPlayer() {
    if (this.video || !this.props.stream) return; // handle initial component render and subsequent renders when player is available

    const { id } = this.props.match.params;
    this.videoPlayer = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.videoPlayer.attachMediaElement(this.videoRef.current);
    this.videoPlayer.load();
  }
  render() {
    if (!this.props.stream) {
      return <div>Loading....</div>;
    }
    return (
      <div className="">
        <div className="ui embed">
          <video ref={this.videoRef} controls style={{ width: "100%" }} />
        </div>
        <h1 className="title">{this.props.stream.title}</h1>
        <h3>{this.props.stream.description}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
