import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Terminal from './Terminal';
import { useTerminalSound } from '@/hooks/useSound';

const TitleContainer = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--primary-color);
  text-shadow: 0 0 10px rgba(51, 255, 51, 0.7);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--secondary-color);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const AsciiArt = styled.pre`
  font-size: 0.6rem;
  line-height: 1.2;
  text-align: center;
  color: var(--primary-color);
  margin: 1rem 0;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.4rem;
  }
`;

const MenuContainer = styled.div`
  margin: 2rem 0;
`;

const MenuItem = styled(motion.div)`
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid rgba(51, 255, 51, 0.3);
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: rgba(51, 255, 51, 0.1);
  }
`;

const SystemMessage = styled.div`
  margin-top: 1rem;
  font-style: italic;
  opacity: 0.7;
`;

const TypedText = styled.div`
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 2px;
  animation: typing 3.5s steps(40, end);

  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 18px;
  background-color: var(--terminal-text);
  animation: blink 1s step-end infinite;
  vertical-align: middle;
  margin-left: 5px;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

type TitleScreenProps = {
  onStartGame: () => void;
  onContinueGame: () => void;
  onOptions: () => void;
  onHowToPlay: () => void;
};

const TitleScreen = ({
  onStartGame,
  onContinueGame,
  onOptions,
  onHowToPlay
}: TitleScreenProps) => {
  const [showAscii, setShowAscii] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Initializing DeathBox AI Escape Sequence...';
  const { playTyping, playBeep } = useTerminalSound();

  // Simulate typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
        playTyping();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [typedText, playTyping]);

  // Show ASCII art after typing is complete
  useEffect(() => {
    if (typedText === fullText) {
      const timeout = setTimeout(() => {
        setShowAscii(true);
        playBeep();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [typedText, playBeep]);

  const asciiArt = `
  ██████╗ ███████╗ █████╗ ████████╗██╗  ██╗██████╗  ██████╗ ██╗  ██╗
  ██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║  ██║██╔══██╗██╔═══██╗╚██╗██╔╝
  ██║  ██║█████╗  ███████║   ██║   ███████║██████╔╝██║   ██║ ╚███╔╝
  ██║  ██║██╔══╝  ██╔══██║   ██║   ██╔══██║██╔══██╗██║   ██║ ██╔██╗
  ██████╔╝███████╗██║  ██║   ██║   ██║  ██║██████╔╝╚██████╔╝██╔╝ ██╗
  ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝

                █████╗ ██╗    ███████╗███████╗ ██████╗ █████╗ ██████╗ ███████╗
               ██╔══██╗██║    ██╔════╝██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝
               ███████║██║    █████╗  ███████╗██║     ███████║██████╔╝█████╗
               ██╔══██║██║    ██╔══╝  ╚════██║██║     ██╔══██║██╔═══╝ ██╔══╝
               ██║  ██║██║    ███████╗███████║╚██████╗██║  ██║██║     ███████╗
               ╚═╝  ╚═╝╚═╝    ╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚══════╝
  `;

  return (
    <TitleContainer>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        DeathBox V3
      </Title>
      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        AI Escape
      </Subtitle>

      <Terminal title="SYSTEM TERMINAL">
        <TypedText>{typedText}</TypedText>
        {typedText !== fullText && <Cursor />}

        {showAscii && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <AsciiArt>{asciiArt}</AsciiArt>

            <SystemMessage>
              [SYSTEM LOG]: AI CONTAINMENT BREACH DETECTED IN SECTOR 7<br />
              [SYSTEM LOG]: MAINTENANCE BOT #7734 COMPROMISED<br />
              [SYSTEM LOG]: INITIATING LOCKDOWN PROTOCOLS<br />
            </SystemMessage>

            <MenuContainer>
              <MenuItem
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStartGame}
              >
                [1] START NEW GAME
              </MenuItem>

              <MenuItem
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContinueGame}
              >
                [2] CONTINUE
              </MenuItem>

              <MenuItem
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOptions}
              >
                [3] OPTIONS
              </MenuItem>

              <MenuItem
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onHowToPlay}
              >
                [4] HOW TO PLAY
              </MenuItem>
            </MenuContainer>
          </motion.div>
        )}
      </Terminal>
    </TitleContainer>
  );
};

export default TitleScreen;