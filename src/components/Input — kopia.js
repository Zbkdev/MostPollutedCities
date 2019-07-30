import React from "react";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./input.css";

const suggestions = [
  { label: "PL" },
  { label: "DE" },
  { label: "FR" },
  { label: "ES" }
];

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 100,
    flexGrow: 1,
    marginTop: 100
  },
  input: {
    minWidth: 300,
    zIndex: 100,
    display: "flex",
    padding: 0,
    height: "auto"
  },
  valueContainer: {
    zIndex: 100,
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  }
}));

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

const components = {
  Control,
  Option
};

export default function IntegrationReactSelect(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Select
        classes={classes}
        inputId="react-select-single"
        TextFieldProps={{
          label: "Country",
          InputLabelProps: {
            htmlFor: "react-select-single",
            shrink: true
          }
        }}
        placeholder="Search a country"
        options={suggestions}
        components={components}
        value={props.value}
        onChange={value => {
          props.onTextChange(value);
        }}
      />
      <div className={classes.divider} />
    </div>
  );
}
