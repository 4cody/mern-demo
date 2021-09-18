import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import axios from "axios";

import "./App.css";

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const comments = await axios.get("/get-text");
      setComments(comments.data);
    }

    fetchComments();
  }, []);

  const listComments = comments.map((c) => {
    return (
      <div key={c._id} className="Comment-Item">
        {c.text}
      </div>
    );
  });
  return (
    <div className="App">
      <Form />
      <div className="Comment-List">{listComments}</div>
    </div>
  );
}

export default App;
