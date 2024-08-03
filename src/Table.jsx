import React from "react";
import Button from "./Button";
import Error from "./Error";
function splitDateTime(dateTimeString) {
  const dateObj = new Date(dateTimeString);

  const datePart = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timePart = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return { date: datePart, time: timePart };
}
function Table({ dispatch, detail }) {
  if (!detail) return {};
  const data = detail.data;
  const dateofJourney = data ? data.dateOfJourney : null;
  let date = null;
  let time = null;
  if (dateofJourney) {
    ({ date, time } = splitDateTime(dateofJourney));
  }
  return (
    <>
      {data ? (
        <>
          <table>
            <tr>
              <th>PNR</th>
              <td>{data.pnrNumber}</td>
            </tr>

            <tr>
              <th>Chart Status</th>
              <td>{data.chartStatus}</td>
            </tr>
            <tr>
              <th>Boarding Station</th>
              <td>{data.boardingPoint}</td>
            </tr>
            <tr>
              <th>Destination Station</th>
              <td>{data.destinationStation}</td>
            </tr>
            <tr>
              <th>Travel Distance</th>
              <td>{data.distance} km</td>
            </tr>
            <tr>
              <th>Ticket Fare</th>
              <td>₹ {data.ticketFare}</td>
            </tr>
            <tr>
              <th>Date of Journey</th>
              <td>
                {time} ({date})
              </td>
            </tr>
            <tr>
              <th>Train Name</th>
              <td>{data.trainName}</td>
            </tr>
            {data.passengerList.map((passenger, index) => {
              return (
                <>
                  <tr>
                    <th>Booking Status: Passenger {index + 1}</th>
                    <td>{passenger.bookingStatusDetails}</td>
                  </tr>
                  <tr>
                    <th>Current Status: Passenger {index + 1}</th>
                    <td>{passenger.currentStatusDetails}</td>
                  </tr>
                </>
              );
            })}
          </table>
          <Button detail={detail} dispatch={dispatch}>
            Reset
          </Button>
        </>
      ) : (
        <Error dispatch={() => dispatch({ type: "setreset" })} />
      )}
    </>
  );
}

export default Table;
