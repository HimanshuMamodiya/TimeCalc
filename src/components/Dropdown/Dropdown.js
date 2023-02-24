import React from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

import { Component } from "react";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.type,
    };
  }

  render() {
    return (
      <>
        <InputLabel variant="filled" htmlFor="uncontrolled-native">
          {"Type"}
        </InputLabel>
        <br />
        <Select
          value={this.props.type}
          onChange={(event) => {
            debugger;
            this.setState({ value: event.target.value });
            this.props.changeType(event.target.value);
          }}
          fullWidth
          displayEmpty
          label={"Type"}
        >
          <MenuItem value={"work hours"}>Work Hours</MenuItem>
          <MenuItem value={"leave"}>Leave</MenuItem>
        </Select>
      </>
    );
  }
}

export default Dropdown;
