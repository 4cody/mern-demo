import React, { useState } from "react";
import axios from "axios";

import "../App.css";

function Form() {
  const [formData, setFormData] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("/post-text", {
      text: formData,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="Form">
      <textarea
        onChange={(e) => {
          setFormData(e.target.value);
        }}
        value={formData}
        name="body"
        id="body"
      ></textarea>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Form;
