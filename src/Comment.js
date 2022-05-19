import React from "react";
import { useState } from "react";
import ControlButtons from "./ControlButtons";
import Identity from "./Identity";
import Replies from "./Replies";
import Upvote from "./Upvote";
import ReplyForm from "./ReplyForm";

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
  updateComment,
  isEditing,
  endProcess,
  addReply,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [reply, setReply] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleReply = () => {
    return setReply(!reply);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedComment = { id, createdAt, score, user, replies, edited };
    updateComment({
      ...updatedComment,
      content: editContent,
      edited: "Edited",
    });
    endProcess();
  };

  const cancelEdit = () => {
    endProcess();
  };

  return (
    <>
      <div
        className={
          isEditing ? "editComment-template card" : "comment-template card"
        }
      >
        <Upvote isEditing={isEditing} existingScore={score} id={id} />
        <Identity
          edited={isEditing ? "Editing" : edited}
          currentUser={currentUser}
          user={user}
          createdAt={createdAt}
        />
        <ControlButtons
          isEditing={isEditing}
          currentUser={currentUser}
          id={id}
          user={user}
          handleReply={handleReply}
          removeComment={removeComment}
          editComment={editComment}
        />

        {isEditing ? (
          <section className="textArea edit-textArea">
            <form>
              <div>
                <textarea
                  className="input"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                ></textarea>
              </div>
              <div className="buttonContainer">
                <button className="cancel" onClick={() => cancelEdit()}>
                  CANCEL
                </button>
                <button
                  className="update"
                  type="submit"
                  onClick={(e) => handleEdit(e)}
                >
                  UPDATE
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section className={readMore ? "readMore-textArea" : "textArea"}>
            {readMore ? content : `${content.substring(0, 210)}`}
            {content.length > content.substring(0, 210).length && (
              <button onClick={() => setReadMore(!readMore)}>
                {readMore ? "...Show Less" : "...Read More"}
              </button>
            )}
          </section>
        )}
      </div>
      {reply && 
        <ReplyForm 
          currentUser={currentUser} 
          commentId={id} 
          commentAuthor={user.username}
          addReply={addReply} 
      />}
      <div className="reply-template">
        {replies.map((replies) => {
          return (
            <Replies
              key={replies.id}
              {...replies}
              removeComment={removeComment}
              currentUser={currentUser}
              isEditing={isEditing}
            />
          );
        })}
      </div>
    </>
  );
};

export default Comment;
