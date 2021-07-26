const VotingBtns = ({
  upvote,
  downvote,
  id
}) => {
  return (
    <>
      <button name='upvote' id={id} onClick={upvote}>⬆</button>
      <button name='downvote' id={id} onClick={downvote}>⬇</button>
    </>
  );
};

export default VotingBtns;
