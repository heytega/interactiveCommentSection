import { useState } from "react";
import ControlButtons from "./ControlButtons";
import Identity from "./Identity";
import ReplyUpvote from "./ReplyUpvote";
import Form from "./Form";

function Replies({
  currentUser,
  id,
  content,
  createdAt,
  score,
  replyingTo,
  user,
  removeComment,
  isEditing,
  commentId,
}) {
  // data & modifiers
  const [innerReadMore, setInnerReadMore] = useState(false);
  const [innerReply, setInnerReply] = useState(false);

  // methods & functions
  const handleInnerReply = () => {
    return setInnerReply(!innerReply);
  };

  // render
  return (
    <>
      <div className="comment-template card">
        {/* isEditing to stop the Upvote functionality if a comment edit is taking play */}
        <ReplyUpvote
          isEditing={isEditing}
          existingScore={score}
          idForReply={id}
          commentId={commentId}
        />

        <Identity currentUser={currentUser} user={user} createdAt={createdAt} />

        <ControlButtons
          currentUser={currentUser}
          user={user}
          removeComment={removeComment}
          handleInnerReply={handleInnerReply}
        />

        <section className={innerReadMore ? "readMore-textArea" : "textArea"}>
          <p className="replyingTo">{`@${replyingTo} `}</p>
          {innerReadMore ? content : `${content.substring(0, 220)}`}

          {content.length > content.substring(0, 220).length && (
            <button onClick={() => setInnerReadMore(!innerReadMore)}>
              {innerReadMore ? "...Show Less" : "...Read More"}
            </button>
          )}
        </section>
      </div>
      {innerReply && <Form currentUser={currentUser} />}
    </>
  );
}

export default Replies;
