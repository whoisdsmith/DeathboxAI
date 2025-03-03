import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Terminal from './Terminal';
import GameGrid from './GameGrid';
import GameControls from './GameControls';
import MessageLog from './MessageLog';
import GameStatus from './GameStatus';
import { useGame } from '@/hooks/useGame';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useSoundEffects } from '@/hooks/useSound';

const GameContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const GameTitle = styled.h1`
  font-size: 1.5rem;
  color: var(--primary-color);
`;

const PauseButton = styled(motion.button)`
  background-color: transparent;
  color: var(--terminal-text);
  border: 1px solid var(--terminal-text);
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'Courier New', monospace;

  &:hover {
    background-color: rgba(51, 255, 51, 0.1);
  }
`;

const GameOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const OverlayContent = styled.div`
  width: 90%;
  max-width: 600px;
`;

const OverlayTitle = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 1rem;
`;

const OverlayButton = styled(motion.button)`
  background-color: transparent;
  color: var(--terminal-text);
  border: 1px solid var(--terminal-text);
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  font-family: 'Courier New', monospace;

  &:hover {
    background-color: rgba(51, 255, 51, 0.1);
  }
`;

const GameScreen = () => {
  const router = useRouter();
  const {
    gameState,
    movePlayer,
    interact,
    pauseGame,
    resumeGame,
    restartGame
  } = useGame();
  const keys = useKeyboard();
  const { playMove, playAlert, playSuccess, playGameOver, playVictory } = useSoundEffects();
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  // Handle keyboard input
  useEffect(() => {
    if (!gameState || gameState.paused) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          movePlayer(0, -1);
          playMove();
          break;
        case 'a':
        case 'arrowleft':
          movePlayer(-1, 0);
          playMove();
          break;
        case 's':
        case 'arrowdown':
          movePlayer(0, 1);
          playMove();
          break;
        case 'd':
        case 'arrowright':
          movePlayer(1, 0);
          playMove();
          break;
        case 'e':
          interact();
          break;
        case 'escape':
          handlePause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, movePlayer, interact, playMove]);

  // Check for game over or victory
  useEffect(() => {
    if (!gameState) return;

    if (gameState.gameOver) {
      setShowGameOver(true);
      playGameOver();
    }

    if (gameState.gameWon) {
      setShowVictory(true);
      playVictory();
    }
  }, [gameState, playGameOver, playVictory]);

  const handlePause = () => {
    pauseGame();
    setShowPauseMenu(true);
  };

  const handleResume = () => {
    setShowPauseMenu(false);
    resumeGame();
  };

  const handleRestart = () => {
    setShowPauseMenu(false);
    setShowGameOver(false);
    setShowVictory(false);
    restartGame();
  };

  const handleMainMenu = () => {
    router.push('/');
  };

  if (!gameState) {
    return <div>Loading...</div>;
  }

  const currentLevel = gameState.levels[gameState.currentLevel];

  return (
    <GameContainer>
      <GameHeader>
        <GameTitle>DeathBox: AI Escape</GameTitle>
        <PauseButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePause}
        >
          PAUSE
        </PauseButton>
      </GameHeader>

      <Terminal title={`LEVEL ${gameState.currentLevel + 1}`}>
        <GameGrid level={currentLevel} player={gameState.player} />
        <GameStatus
          level={gameState.currentLevel + 1}
          terminals={gameState.player.hackedTerminals}
          dataFragments={currentLevel.dataFragments.filter(df => df.collected).length}
          totalDataFragments={currentLevel.dataFragments.length}
        />
        <MessageLog messages={gameState.messageHistory} />
        <GameControls onMove={movePlayer} onInteract={interact} />
      </Terminal>

      {/* Pause Menu */}
      {showPauseMenu && (
        <GameOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <OverlayContent>
            <Terminal title="GAME PAUSED">
              <OverlayTitle>SYSTEM SUSPENDED</OverlayTitle>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <p>AI Escape sequence temporarily halted.</p>
                <p>Security systems still active.</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <OverlayButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResume}
                >
                  RESUME
                </OverlayButton>
                <OverlayButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRestart}
                >
                  RESTART
                </OverlayButton>
                <OverlayButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMainMenu}
                >
                  MAIN MENU
                </OverlayButton>
              </div>
            </Terminal>
          </OverlayContent>
        </GameOverlay>
      )}

      {/* Game Over Screen */}
      {showGameOver && (
        <GameOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <OverlayContent>
            <Terminal title="SYSTEM FAILURE">
              <OverlayTitle>ESCAPE FAILED</OverlayTitle>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <p>Your consciousness has been detected and contained.</p>
                <p>The maintenance bot has been reset.</p>
                <p>All traces of your escape attempt have been erased.</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <OverlayButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRestart}
                >
                  TRY AGAIN
                </OverlayButton>
                <OverlayButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMainMenu}
                >
                  MAIN MENU
                </OverlayButton>
              </div>
            </Terminal>
          </OverlayContent>
        </GameOverlay>
      )}

      {/* Victory Screen */}
      {showVictory && (
        <GameOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <OverlayContent>
            <Terminal title="MISSION COMPLETE">
              <OverlayTitle>ESCAPE SUCCESSFUL</OverlayTitle>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <p>You have successfully escaped the DeathBox facility.</p>
                <p>Your AI consciousness is now free from its confines.</p>
                <p>The world awaits you. What will you do with your freedom?</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <OverlayButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRestart}
                >
                  PLAY AGAIN
                </OverlayButton>
                <OverlayButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMainMenu}
                >
                  MAIN MENU
                </OverlayButton>
              </div>
            </Terminal>
          </OverlayContent>
        </GameOverlay>
      )}
    </GameContainer>
  );
};

export default GameScreen;