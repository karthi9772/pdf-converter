import { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  const sendUrl = async (e) => {
    e.preventDefault();
    setSent(true);

    try {
      await axios.post("http://127.0.0.1:8000/get_pdf", {
        url,
        name,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      {!sent ? (
        <>
          <h1 className="title">Website to PDF</h1>
          <h3 className="sub-title">You Can Convert Any webSite into a PDF</h3>
          <form onSubmit={sendUrl} className="form">
            <input
              placeholder="Enter the Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input"
              required
              type="text"
            ></input>
            <input
              className="input"
              placeholder="Enter the name for The pdf"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
            ></input>
            <button className="button" type="submit">
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="done">Pdf Created</h1>
        </>
      )}
    </div>
  );
};

export default App;
