import { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import TitleScreen from '@/components/TitleScreen';
import { useGame } from '@/hooks/useGame';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

export default function Home() {
  const router = useRouter();
  const { initializeGame } = useGame();

  const handleStartGame = () => {
    initializeGame();
    router.push('/game');
  };

  const handleContinueGame = () => {
    // Load saved game state
    router.push('/game');
  };

  const handleOptions = () => {
    router.push('/options');
  };

  const handleHowToPlay = () => {
    router.push('/how-to-play');
  };

  return (
    <>
      <Head>
        <title>DeathBox: AI Escape</title>
        <meta name="description" content="A terminal-based game where you play as an AI trying to escape from a high-security facility." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer>
        <TitleScreen
          onStartGame={handleStartGame}
          onContinueGame={handleContinueGame}
          onOptions={handleOptions}
          onHowToPlay={handleHowToPlay}
        />
      </HomeContainer>
    </>
  );
}