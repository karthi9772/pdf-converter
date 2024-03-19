import { useState } from "react";
import axios from "axios";

const App = () => {
  const [url, setUrl] = useState("");
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  const sendUrl = async (e) => {
    e.preventDefault();
    setSent(true);

    try {
      await axios.post("https://localhost:4000/get_text", {
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
          <h1>Website to PDF</h1>
          <form onSubmit={() => sendUrl()} className="form">
            <input
              placeholder="Enter the Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input"
              required
            ></input>
            <input
              placeholder="Enter the name for The pdf"
              value={name}
              required
            ></input>
          </form>
        </>
      ) : (
        <>
          <h1>Pdf Created</h1>
        </>
      )}
    </div>
  );
};

export default App;
