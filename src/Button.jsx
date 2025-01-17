import React, { useEffect, useState } from "react";

function Button({ detail, pnr, dispatch, children }) {
  const [clicked, setclicked] = useState(false);
  useEffect(
    function () {
      async function fetchPNRStatus() {
        if (clicked && pnr) {
          const response = await fetch(
            `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${pnr}`,
            {
              method: "GET",
              headers: {
                "x-rapidapi-host":
                  "irctc-indian-railway-pnr-status.p.rapidapi.com",
                "x-rapidapi-key":
                import.meta.env.VITE_RAILWAY_API_KEY,
              },
            }
          );
          const data = await response.json();
          if (data) {
            dispatch({ type: "setdetail", payload: data });
          }
        }
      }
      fetchPNRStatus();
    },
    [clicked]
  );
  function handleSubmit() {
    if ((Object.keys(detail).length != 0)) {
      dispatch({ type: "setreset" });
      return;
    }
    setclicked(true);
  }
  return (
    <button type="text" className="submit" onClick={() => handleSubmit()}>
      {children}
    </button>
  );
}

export default Button;
