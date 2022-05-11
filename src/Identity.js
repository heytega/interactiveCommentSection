import React from "react";

const Identity = ({ currentUser, user, createdAt, edited }) => {
  return (
    <section className="identity">
      <img src={user.image.png} alt="avi" className="profile-img" />
      <h4>{user.username}</h4>
      {user.username === currentUser.username && (
        <h6 className="indicator">YOU</h6>
      )}
      <p>{createdAt}</p>
      {edited && <p className="edited">{edited}</p>}
    </section>
  );
};

export default Identity;
