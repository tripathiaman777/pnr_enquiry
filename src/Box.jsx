import React, { useReducer, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Title from "./Title";
import Table from "./Table";
const initialState = {
  pnr: localStorage.getItem("pnr") || "",
  detail: {},
  reset: true,
  error: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "setpnr":
      return { ...state, pnr: action.payload };
    case "setdetail":
      localStorage.setItem("pnr", state.pnr);
      return { ...state, reset: false, detail: action.payload };
    case "setreset":
      return { ...initialState };
    case "error":
      return { ...initialState, error: true };
    default:
      throw new Error("Invalid action");
  }
}
function Box() {
  const [{ pnr, detail, reset, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <>
      {error && (
        <div className="error">
        Error
          </div>
      )}
      {reset ? (
        <div className="box">
          <div className="form">
            <Title />
            <Input pnr={pnr} dispatch={dispatch} />
            <Button detail={detail} dispatch={dispatch} pnr={pnr}>
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Table detail={detail} dispatch={dispatch} />
        </div>
      )}
    </>
  );
}

export default Box;
