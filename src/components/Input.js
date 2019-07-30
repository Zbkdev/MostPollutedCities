import React from "react";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "./input.css";

const suggestions = [
  { label: "Poland" },
  { label: "Germany" },
  { label: "France" },
  { label: "Spain" }
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 25,
    marginBottom: 15,
    zIndex: 100
  },
  input: {
    fontSize: 35,
    display: "flex",
    padding: 0,
    height: "auto"
  },

  valueContainer: {
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
  const [single, setSingle] = React.useState(null);
  function handleChangeSingle(value) {
    setSingle(value);
  }

  return (
    <div className={classes.root}>
      <Select
        classes={classes}
        inputId="react-select-single"
        TextFieldProps={{
          InputLabelProps: {
            htmlFor: "react-select-single",
            shrink: true
          }
        }}
        placeholder="Search a country"
        options={suggestions}
        components={components}
        value={single}
        onChange={value => {
          handleChangeSingle(value);
          props.onTextChange(value.label);
        }}
      />
      <div className={classes.divider} />
    </div>
  );
}
