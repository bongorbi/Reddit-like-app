const TextareaWithButton = ({
  id,
  sendText,
}) => {

  function onBlur(e){
    sendText(e.target.value);
  }

  return (
    <div>
      <textarea id={id} onBlur={onBlur} />
      <button onClick={sendText}>Send</button>
    </div>
  );
};
export default TextareaWithButton;
