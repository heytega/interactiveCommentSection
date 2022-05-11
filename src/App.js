import "./App.css";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import LoadingPage from "./Loading";

const comment_url = "http://localhost:7000/comments";
const currentUser_url = "http://localhost:7000/currentUser";

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
    <Comments
      fetchComments={fetchComments}
      currentUser={currentUser}
      comments={comments}
      removeComment={removeComment}
      addComment={addComment}
      updateComment={updateComment}
    />
  );
};

export default App;
