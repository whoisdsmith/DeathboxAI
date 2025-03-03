import { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import GameScreen from '@/components/GameScreen';
import { useGame } from '@/hooks/useGame';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

export default function Game() {
  const router = useRouter();
  const { gameState, isGameInitialized } = useGame();

  useEffect(() => {
    // Redirect to home if game is not initialized
    if (!isGameInitialized) {
      router.push('/');
    }
  }, [isGameInitialized, router]);

  return (
    <>
      <Head>
        <title>DeathBox: AI Escape - Game</title>
        <meta name="description" content="Escape the DeathBox facility." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameContainer>
        <GameScreen />
      </GameContainer>
    </>
  );
}