import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import LoadingPage from "./Loading";

const comment_url = "http://localhost:7000/comments";
const currentUser_url = "http://localhost:7000/currentUser";

// Context API for Reply upvote

const ReplyContext = React.createContext();

const App = () => {
  // data initializations
  const [comments, setComment] = useState([]);
  const [Loading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState([]);

  // methods & functions
  const fetchCurrentUser = async () => {
    try {
      const res = await fetch(currentUser_url);
      if (res.ok) {
        const currentUser = await res.json();
        setCurrentUser(currentUser);
      }
    } catch (error) {
      alert("Error encountered whilst fetching current user");
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(comment_url);
      const comments = await res.json();
      setComment(comments);
    } catch (err) {
      alert("Error fetching comments");
    }
  };

  const addComment = async (comment) => {
    try {
      const res = await fetch("http://localhost:7000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComment([...comments, newComment]);
      }
    } catch (error) {
      alert("Error encounter whilst adding new comment");
    }
  };

  const removeComment = async (id) => {
    try {
      const res = await fetch(`http://localhost:7000/comments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const newComment = comments.filter((comment) => comment.id !== id);
        setComment(newComment);
      }
    } catch (error) {
      alert("Error removing comment");
    }
  };

  const updateComment = async (comment) => {
    try {
      await fetch(`http://localhost:7000/comments/${comment.id}`, {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(comment),
      });
      const updtCmts = comments.map((c) => (c.id === comment.id ? comment : c));
      setComment(updtCmts);
    } catch (error) {
      alert("Error updating comment");
    }
  };

  // add reply to comment
  const addReply = async (commentId, reply) => {
    const comment = comments.find((comment) => comment.id === commentId);
    const newComment = {
      ...comment,
      replies: [...comment.replies, reply],
    };

    try {
      const res = await fetch(`http://localhost:7000/comments/${commentId}`, {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      if (res.ok) {
        const updatedComments = comments.map((c) =>
          c.id === commentId ? newComment : c
        );
        setComment(updatedComments);
      }
    } catch (error) {
      alert("Error adding reply");
    }
  };

  // add and Upvote Functionality to the replies.
  const changeUpvote = async ({ commentId, replyId, newScore }) => {
    try {
      const comment = comments.find((comment) => comment.id === commentId);
      console.log(comment);

      const targetReply = comment.replies.find((c) => c.id === replyId);
      console.log(targetReply);

      const restOfReplies = comment.replies.filter(
        (reply) => reply.id !== replyId
      );
      console.log(restOfReplies);

      const updatedReply = {
        ...targetReply,
        score: newScore,
      };
      console.log(updatedReply);

      const modifiedComment = {
        ...comment,
        replies: [...restOfReplies, updatedReply],
      };
      console.log(modifiedComment);

      const res = await fetch(`http://localhost:7000/comments/${commentId}`, {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(modifiedComment),
      });
      if (res.ok) {
        const newlyModified = comments.map((c) =>
          c.id === commentId ? modifiedComment : c
        );
        setComment(newlyModified);
      }
    } catch (error) {
      alert("Error implementing Upvote");
    }
  };

  // effects
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await fetchComments();
      await fetchCurrentUser();
      setIsLoading(false);
    };
    init();
  }, []);

  // render
  if (Loading) {
    return <LoadingPage />;
  }
  return (
    <ReplyContext.Provider value={changeUpvote}>
      <Comments
        fetchComments={fetchComments}
        currentUser={currentUser}
        comments={comments}
        removeComment={removeComment}
        addComment={addComment}
        updateComment={updateComment}
        addReply={addReply}
      />
    </ReplyContext.Provider>
  );
};

export default App;
