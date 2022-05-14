import React, { useEffect } from "react";
import { useState } from "react";

const Form = ({ currentUser, addComment }) => {
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   setContent(comment ? comment.content : "");
  // }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({
      id: new Date().getTime().toString(),
      content,
      createdAt: "Just Now",
      score: 0,
      user: currentUser,
      replies: [],
    });
    setContent("");
  };

  return (
    <div>
      <form className="form card" onSubmit={handleSubmit}>
        <img src={currentUser.image.png} alt="avi" className="profile-img" />
        <textarea
          type="text"
          className="input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="btn" type="submit">
          SEND
        </button>
      </form>
    </div>
  );
};

export default Form;
