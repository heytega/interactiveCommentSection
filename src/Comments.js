import React from "react";
import Comment from "./Comment";
import Form from "./Form";
import { useState } from "react";

const Comments = ({
  currentUser,
  comments,
  removeComment,
  addComment,
  updateComment,
  addReply,
  modifyVote,
}) => {
  const [edit, setEdit] = useState(null);
  const [processEdit, setProcessEdit] = useState(false);

  const editComment = (id) => {
    try {
      setEdit(comments.find((comment) => comment.id === id));
      setProcessEdit(true);
    } catch (error) {
      alert("Error Staging Edit");
    }
  };

  const endProcess = () => {
    setProcessEdit(false);
    setEdit(null);
  };

  return (
    <>
      {comments.map((comment) => (
        <Comment
          currentUser={currentUser}
          key={comment.id}
          {...comment}
          removeComment={removeComment}
          editComment={editComment}
          updateComment={updateComment}
          isEditing={processEdit && edit.id === comment.id}
          addReply={addReply}
          endProcess={endProcess}
          modifyVote={modifyVote}
        />
      ))}

      <Form addComment={addComment} currentUser={currentUser} />
    </>
  );
};

export default Comments;
