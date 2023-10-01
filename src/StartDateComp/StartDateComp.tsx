import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import validator from "validator";

const StartDateComponent = () => {
  const [date1, setDate1] = useState("") as any;
  const [date2, setDate2] = useState();
  const [diffDate, setDigffDate] = useState(0);
  const [message, setMessage] = useState(" ");
  const [messageColor, setMessageColor] = useState("green");

  function handleDate1(event: any) {
    let inputDate = event.target.value;
    setDate1(inputDate);

    if (validator.isDate(inputDate)) {
      setMessage("Date is Valid");
      setMessageColor("green");
    } else {
      setMessage("Please, Enter a valid date!");
      setMessageColor("red");
    }
  }
  function handleDate2(event: any) {
    let inputDate = event.target.value;
    setDate2(inputDate);

    if (validator.isDate(inputDate)) {
      setMessage("Date is Valid");
      setMessageColor("green");
    } else {
      setMessage("Please, Enter a valid date!");
      setMessageColor("red");
    }
  }

  const dateConverter = (startDate: any, timeEnd: any) => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(timeEnd);
    let result = moment(newStartDate).diff(newEndDate, "days");
    return result;
  };

  const onSubmitDate = () => {
    if (date1 && date2) {
      if (dateConverter(date1, date2) > 0) {
        setDigffDate(dateConverter(date1, date2));
      }
    } else {
      setMessage("Enter vaid date");
      setMessageColor("red");
    }
  };

  const getDateApi = () => {
    const apiUrl = "http://localhost:3001";
    axios.get(apiUrl, {}).then((res) => {
      const d = new Date(res.data?.startDate);
      console.log("api", d);

      setDate1(moment(d).format("DD / MM / YYYY"));
    });
  };

  useEffect(() => {
    getDateApi();
  }, [date1]);

  return (
    <>
      <div className="flex">
        <h1>Date Diff:{diffDate}</h1>
        <div style={{ color: messageColor }}> {message} </div>

        <div className="form-group">
          <label>Date 1:</label>
          <input type="text" value={date1} onChange={handleDate1} />
        </div>
        <div className="form-group">
          <label>Date 1:</label>
          <input type="date" value={date2} onChange={handleDate2} />
        </div>
        <button onClick={onSubmitDate}>SUBMIT</button>
      </div>
    </>
  );
};

export default StartDateComponent;
