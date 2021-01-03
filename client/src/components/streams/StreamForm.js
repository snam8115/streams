import React, { Fragment } from "react";
import { reduxForm, Field } from "redux-form";

class StreamForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div class="ui error message">{error}</div>;
    } else return "";
  };
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        <Fragment>{this.renderError(meta)}</Fragment>
      </div>
    );
  };
  onSubmit = (formData) => {
    this.props.onSubmit(formData); //.then(() => {//success code});
  };
  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title: "
        />

        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description: "
        />

        <button className="ui primary button">Submit</button>
      </form>
    );
  }
}

const validate = (formData) => {
  const errors = {};

  if (!formData.title) errors.title = "Enter a title";
  if (!formData.description) errors.description = "Enter description";

  return errors;
};

export default reduxForm({ form: "streamForm", validate: validate })(
  StreamForm
);
