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
          <h1></h1>
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
