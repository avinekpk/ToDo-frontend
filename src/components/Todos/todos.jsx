import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

const Todo = ({ description, checkedValue }) => {
  console.log("description", description);
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox defaultChecked={checkedValue} />}
        label={description.description}
      />
    </FormGroup>
  );
};

export default Todo;
