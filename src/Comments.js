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
}) => {
  const [edit, setEdit] = useState(null);
  const [processEdit, setProcessEdit] = useState(false);

  const editComment = (id) => {
    setProcessEdit(true);
    setEdit(comments.find((comment) => comment.id === id));
    window.scrollTo(0, document.body.scrollHeight);
  };

  const endProcess = () => {
    setProcessEdit(false);
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
          isEditing={processEdit && edit.id === comment.id}
        />
      ))}

      <Form
        endProcess={endProcess}
        comment={edit}
        addComment={addComment}
        currentUser={currentUser}
        updateComment={updateComment}
      />
    </>
  );
};

export default Comments;
