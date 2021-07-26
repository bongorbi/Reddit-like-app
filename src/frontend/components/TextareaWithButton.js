import { useState } from 'react';
import './postWithComments.scss';

const TextareaWithButton = ({
  id,
  sendText
}) => {
  const [text, setText] = useState('');

  function onBlur(e) {
    setText(e.target.value);
  }

  function onClick() {
    sendText(text);
  }

  return (
    <div className="txtWithButton">
      <textarea cols="50" rows="3" id={id} onBlur={onBlur}/>
      <button onClick={onClick}>Send</button>
    </div>
  );
};
export default TextareaWithButton;
