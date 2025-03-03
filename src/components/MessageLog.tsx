import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LogContainer = styled.div`
  margin: 1rem 0;
  padding: 0.5rem;
  border: 1px solid rgba(51, 255, 51, 0.3);
  height: 120px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  position: relative;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(51, 255, 51, 0.5);
    border-radius: 4px;
  }

  @media (max-width: 480px) {
    height: 100px;
    font-size: 0.8rem;
  }
`;

const LogTitle = styled.div`
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: var(--terminal-background);
  padding: 0 5px;
  font-size: 0.8rem;
  opacity: 0.7;
`;

const MessageItem = styled(motion.div)`
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 14px;
  background-color: var(--terminal-text);
  animation: blink 1s step-end infinite;
  vertical-align: middle;
  margin-left: 5px;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

type MessageLogProps = {
  messages: string[];
};

const MessageLog = ({ messages }: MessageLogProps) => {
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <LogContainer ref={logRef}>
      <LogTitle>SYSTEM LOG</LogTitle>
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </MessageItem>
      ))}
      <Cursor />
    </LogContainer>
  );
};

export default MessageLog;