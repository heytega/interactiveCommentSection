import { useState } from "react";

const ReplyForm = ({
  currentUser,
  commentId,
  commentAuthor,
  addReply,
  handleReply,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReply(commentId, {
      id: new Date().getTime(),
      content,
      createdAt: new Date().toISOString(),
      score: 0,
      user: currentUser,
      replyingTo: commentAuthor,
    });
    setContent("");
    handleReply();
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

export default ReplyForm;
