import { useState } from 'react';
import './postWithComments.scss';

const TextareaWithButton = ({
  id,
  sendText,
  title,
  showTitleField
}) => {
  const [commentTxt, setComment] = useState('');
  const [titleTxt, setTitle] = useState('');

  function commentText(e) {
    setComment(e.target.value);
  }

  function titleText(e) {
    setTitle(e.target.value);
  }

  function onClick() {
    sendText({
      commentTxt,
      titleTxt
    });
  }

  return (
    <div className="txtWithButton">
      {showTitleField &&
      <input placeholder="Title..." onBlur={titleText} title={title}/>
      }
      <div className='txtAreaWithBtn'>
        <textarea placeholder="Comment..."  rows="3" id={id} onBlur={commentText}/>
        <button onClick={onClick}>Send</button>
      </div>
    </div>
  );
};
export default TextareaWithButton;
