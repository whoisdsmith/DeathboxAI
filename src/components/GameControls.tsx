import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSoundEffects } from '@/hooks/useSound';

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(51, 255, 51, 0.3);
`;

const ControlsTitle = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  opacity: 0.7;
`;

const DirectionalControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ControlButton = styled(motion.button)`
  background-color: transparent;
  color: var(--terminal-text);
  border: 1px solid var(--terminal-text);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: 'Courier New', monospace;

  &:hover {
    background-color: rgba(51, 255, 51, 0.1);
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
  }
`;

const ActionButton = styled(motion.button)`
  background-color: transparent;
  color: var(--terminal-text);
  border: 1px solid var(--terminal-text);
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  font-family: 'Courier New', monospace;

  &:hover {
    background-color: rgba(51, 255, 51, 0.1);
  }
`;

const KeyboardHint = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  opacity: 0.6;
  text-align: center;
`;

type GameControlsProps = {
  onMove: (dx: number, dy: number) => void;
  onInteract: () => void;
};

const GameControls = ({ onMove, onInteract }: GameControlsProps) => {
  const { playMove } = useSoundEffects();
  const [showControls, setShowControls] = useState(true);

  const handleMove = (dx: number, dy: number) => {
    onMove(dx, dy);
    playMove();
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <ControlsContainer>
      <ControlsTitle>
        <motion.span
          whileHover={{ scale: 1.1 }}
          onClick={toggleControls}
          style={{ cursor: 'pointer' }}
        >
          {showControls ? '▼ CONTROLS (CLICK TO HIDE)' : '▶ CONTROLS (CLICK TO SHOW)'}
        </motion.span>
      </ControlsTitle>

      {showControls && (
        <>
          <DirectionalControls>
            <div></div>
            <ControlButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMove(0, -1)}
            >
              <FaArrowUp />
            </ControlButton>
            <div></div>

            <ControlButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMove(-1, 0)}
            >
              <FaArrowLeft />
            </ControlButton>
            <div></div>
            <ControlButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMove(1, 0)}
            >
              <FaArrowRight />
            </ControlButton>

            <div></div>
            <ControlButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMove(0, 1)}
            >
              <FaArrowDown />
            </ControlButton>
            <div></div>
          </DirectionalControls>

          <div>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onInteract}
            >
              INTERACT (E)
            </ActionButton>
          </div>

          <KeyboardHint>
            Use W/A/S/D or Arrow Keys to move, E to interact
          </KeyboardHint>
        </>
      )}
    </ControlsContainer>
  );
};

export default GameControls;