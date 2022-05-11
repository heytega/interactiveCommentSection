import React from "react";
import { useState } from "react";
import ControlButtons from "./ControlButtons";
import Identity from "./Identity";
import Replies from "./Replies";
import Upvote from "./Upvote";
import Form from "./Form";

const Comment = ({
  currentUser,
  id,
  content,
  createdAt,
  score,
  user,
  replies,
  edited,
  removeComment,
  editComment,
  isEditing,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [reply, setReply] = useState(false);

  const handleReply = () => {
    return setReply(!reply);
  };

  return (
    <>
      <div
        /*className={"comment-template card " isEditing && "activeEdit"}*/ className={
          isEditing
            ? "comment-template card activeEdit"
            : "comment-template card"
        }
      >
        <Upvote existingScore={score} id={id} />
        <Identity
          edited={isEditing ? "Editing.." : edited}
          currentUser={currentUser}
          user={user}
          createdAt={createdAt}
        />
        <ControlButtons
          currentUser={currentUser}
          id={id}
          user={user}
          handleReply={handleReply}
          removeComment={removeComment}
          editComment={editComment}
        />
        <section className={readMore ? "readMore-textArea" : "textArea"}>
          {readMore ? content : `${content.substring(0, 210)}`}
          {content.length > content.substring(0, 210).length && (
            <button onClick={() => setReadMore(!readMore)}>
              {readMore ? "...Show Less" : "...Read More"}
            </button>
          )}
        </section>
      </div>
      {reply && <Form score={score} currentUser={currentUser} />}
      <div className="reply-template">
        {replies.map((replies) => {
          return (
            <Replies
              key={replies.id}
              {...replies}
              removeComment={removeComment}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </>
  );
};

export default Comment;
