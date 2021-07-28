const ManipulatingButton = ({
  upvote,
  downvote,
  id,
}) => {
  // upvote and downvote buttons
  return (
    <div className="btnContainer">
      <button name="upvote" id={id} onClick={upvote}>⬆</button>
      <button name="downvote" id={id} onClick={downvote}>⬇</button>
    </div>
  );
};

export default ManipulatingButton;
