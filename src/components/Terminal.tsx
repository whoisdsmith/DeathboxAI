import { ReactNode } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TerminalContainer = styled(motion.div)`
  background-color: var(--terminal-background);
  border: 2px solid var(--terminal-border);
  border-radius: 5px;
  padding: 20px;
  font-family: 'Courier New', monospace;
  color: var(--terminal-text);
  box-shadow: 0 0 10px rgba(51, 255, 51, 0.4);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 800px;
`;

const TerminalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const TerminalTitle = styled.div`
  font-weight: bold;
  color: #999;
`;

const TerminalButtons = styled.div`
  display: flex;
`;

const TerminalButton = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 8px;
  background-color: ${props => props.color};
`;

const TerminalContent = styled.div`
  position: relative;
  z-index: 1;
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: rgba(51, 255, 51, 0.3);
  animation: scan 8s linear infinite;
  pointer-events: none;
  z-index: 0;

  @keyframes scan {
    0% { top: 0; }
    100% { top: 100%; }
  }
`;

type TerminalProps = {
  children: ReactNode;
  title?: string;
  showScanline?: boolean;
};

const Terminal = ({ children, title = 'Terminal', showScanline = true }: TerminalProps) => {
  return (
    <TerminalContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TerminalHeader>
        <TerminalTitle>{title}</TerminalTitle>
        <TerminalButtons>
          <TerminalButton color="#ff5f5f" />
          <TerminalButton color="#ffbd2e" />
          <TerminalButton color="#27c93f" />
        </TerminalButtons>
      </TerminalHeader>

      {showScanline && <ScanLine />}

      <TerminalContent>
        {children}
      </TerminalContent>
    </TerminalContainer>
  );
};

export default Terminal;