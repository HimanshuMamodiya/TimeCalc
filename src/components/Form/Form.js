import React, { Component } from "react";
import PropTypes from "prop-types";

import { Grid, Paper, withStyles } from "@material-ui/core";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  fetchCalculation,
  save,
  resetCalculation,
} from "../../connectors/redux/actions";

import TimeField from "../TimeField/TimeField";
import DateField from "../DateField/DateField";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";
import { TimeHelper } from "../../connectors/redux/helpers";
import Dropdown from "../Dropdown/Dropdown";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

const validate = (values, props) => {
  const errors = {};

  if (!values.start || !values.end) {
    errors.duration = "No Start and End Time set";
  }

  if (!Object.keys(errors).length) {
    this.props.calculate(values);
  }

  return errors;
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "work hours",
      file: null,
    };
    this.fileUploadRef = React.createRef();
  }

  handleUploadClick = () => {
    //redirect the click event onto the hidden input element
    this.fileUploadRef.current?.click();
  };

  handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    this.setState({ file: e.target.files[0] });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.save)}>
        <Paper className={this.props.classes.control}>
          <Grid
            container
            className={this.props.classes.root}
            spacing={16}
            justify="center"
          >
            <Grid item xs={12}>
              <Field
                name="description"
                label="Description"
                fullWidth
                component={TextField}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Dropdown
                type={this.state.type}
                changeType={(val) => this.setState({ type: val })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Field name="start" label="Start Time" component={TimeField} />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Field name="end" label="End Time" component={TimeField} />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Field name="date" label="Day" component={DateField} />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Field
                name="duration"
                label="Duration"
                component={TimeField}
                showPicker={false}
                disabled
                defaultValue="00:00"
              />
            </Grid>
            {this.state.type == "leave" ? (
              <Grid item xs={12} sm={6} md={2}>
                <div>
                  <div>Upload a file:</div>
                  <button onClick={this.handleUploadClick}>
                    {this.state.file
                      ? `${this.state.file.name}`
                      : "Click to select"}
                  </button>
                  <input
                    type="file"
                    ref={this.fileUploadRef}
                    onChange={this.handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              </Grid>
            ) : (
              <></>
            )}

            <Grid item xs={12} sm={6} md={2}>
              {this.props.valid && (
                <Button
                  invoke={() => null}
                  context={this.props}
                  type="submit"
                  icon={this.props.edit ? "save" : "add"}
                  label={this.props.edit ? "Save" : "Add"}
                />
              )}
              {this.props.edit && (
                <Button
                  color="secondary"
                  invoke={this.props.reset}
                  context={props}
                  icon="cancel"
                  label="Cancel"
                />
              )}
            </Grid>
          </Grid>
          <Field
            name="index"
            // todo causes rerender: function is the problem, make it static?!
            component={({ input }) => <input type="hidden" {...input} />}
          />
        </Paper>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const edit = !!(state.form.time && state.form.time.values
    ? state.form.time.values.index !== undefined
    : undefined);

  return {
    initialValues: edit
      ? undefined
      : { break: "00:00", date: TimeHelper.today() },
    edit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calculate: (formValue) => dispatch(fetchCalculation(formValue)),
    reset: () => dispatch(resetCalculation()),
    save: (values, dispatch) => {
      dispatch(save(values, values.index));
      dispatch(resetCalculation());
    },
  };
};

Form.propTypes = {
  edit: PropTypes.bool,
  valid: PropTypes.bool,
  save: PropTypes.func,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  classes: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(reduxForm({ form: "time", validate })(Form)));
