import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  // state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "320904620559-p0mv6ss9ignt9dhnuc8sji3ph5ctve5d.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          //this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.oAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.oAuthChange);
        });
    });
  }
  oAuthChange = (isSignedIn) => {
    const userId = this.auth.currentUser.get().getId();
    //this.setState({ isSignedIn: isSignedIn });
    if (isSignedIn) this.props.signIn(userId);
    // //this.auth.isSignedIn.get() });
    else this.props.signOut(userId);
  };
  handleSignIn = () => {
    this.auth.signIn();
  };
  handleSignOut = () => {
    this.auth.signOut();
  };
  renderAuthButtons = () => {
    const signedIn = this.props.isSignedIn;
    if (signedIn === null) return null;
    if (signedIn)
      return (
        <button className="ui red google button" onClick={this.handleSignOut}>
          <i className="google icon" />
          {this.props.userId} Sign out!!
        </button>
      );
    return (
      <button className="ui green google button" onClick={this.handleSignIn}>
        <i className="google icon" />
        Sign In with Google
      </button>
    );
  };
  render() {
    return <div className="item">{this.renderAuthButtons()}</div>;
  }
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};
export default connect(mapStateToProps, { signIn: signIn, signOut: signOut })(
  GoogleAuth
);
