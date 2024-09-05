import { useState, useEffect } from 'react';
import bus from '../../utils/bus';
import styles from './message.module.css';

function Message() {
  const [type, setType] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    bus.addListener('flash', ({ type, message }) => {
      setType(type);
      setMessage(message);
      setVisibility(true);

      const id = setTimeout(() => {
        setVisibility(false);
      }, 3000);
      setTimeoutId(id);
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  );
}

export default Message;