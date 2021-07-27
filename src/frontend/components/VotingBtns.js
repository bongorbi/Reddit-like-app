const VotingBtns = ({
  upvote,
  downvote,
  id
}) => {
  return (
    <div className="btnContainer">
      <button name="upvote" id={id} onClick={upvote}>⬆</button>
      <button name="downvote" id={id} onClick={downvote}>⬇</button>
    </div>
  );
};

export default VotingBtns;
