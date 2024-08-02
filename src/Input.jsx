import React from "react";

function Input({pnr, dispatch}) {
    function handleInput(e){
        dispatch({type: "setpnr", payload: e.target.value});
    }
  return (
    <div className="input-container ic1">
      <input id="firstname" value={pnr} onChange={(e)=>handleInput(e)} className="input" type="text" placeholder=" " />
      <div className="cut"></div>
      <label  className="placeholder">
        PNR Status
      </label>
    </div>
  );
}

export default Input;
