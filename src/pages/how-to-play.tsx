import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Terminal from '@/components/Terminal';

const HowToPlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

const BackButton = styled(motion.button)`
  background-color: transparent;
  color: var(--terminal-text);
  border: 1px solid var(--terminal-text);
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  font-family: 'Courier New', monospace;

  &:hover {
    background-color: rgba(51, 255, 51, 0.1);
  }
`;

export default function HowToPlay() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>DeathBox: AI Escape - How to Play</title>
        <meta name="description" content="Learn how to play DeathBox: AI Escape." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HowToPlayContainer>
        <Terminal title="HOW TO PLAY">
          <h2>DEATHBOX V3: AI ESCAPE - GAME CONTROLS</h2>
          <div style={{ margin: '20px 0' }}>
            <h3>MOVEMENT:</h3>
            <p>W or ↑ = Move up</p>
            <p>A or ← = Move left</p>
            <p>S or ↓ = Move down</p>
            <p>D or → = Move right</p>
          </div>

          <div style={{ margin: '20px 0' }}>
            <h3>ACTIONS:</h3>
            <p>E = Interact with objects (terminals, doors, etc.)</p>
            <p>H = Help/Hint (shows available actions)</p>
            <p>M = Map view (if available)</p>
            <p>ESC = Pause game</p>
          </div>

          <div style={{ margin: '20px 0' }}>
            <h3>GAME ELEMENTS:</h3>
            <p>@ = Your character (maintenance robot)</p>
            <p># = Walls</p>
            <p>. = Empty space</p>
            <p>D = Doors (locked or unlocked)</p>
            <p>T = Terminals (can be hacked)</p>
            <p>G = Guards (avoid them)</p>
            <p>C = Security cameras (avoid their line of sight)</p>
            <p>? = Data fragments (collect these to learn the story)</p>
            <p>E = Exit point</p>
          </div>

          <div style={{ margin: '20px 0' }}>
            <h3>TIPS:</h3>
            <p>- Plan your route carefully before moving</p>
            <p>- Guards follow patrol patterns - observe them</p>
            <p>- Hack terminals to disable security systems</p>
            <p>- Collect data fragments to uncover the story</p>
            <p>- Save your progress at terminals</p>
          </div>
        </Terminal>
        <BackButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
        >
          Back to Main Menu
        </BackButton>
      </HowToPlayContainer>
    </>
  );
}