import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [formData, setFormData] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // stops default reloading behaviour
    const response = await axios.post("/post-text", {
      text: formData,
    });

    console.log(response);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="body">Body</label>
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
