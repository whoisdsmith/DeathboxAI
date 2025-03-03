import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Terminal from '@/components/Terminal';
import { useGame } from '@/hooks/useGame';

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid rgba(51, 255, 51, 0.3);

  &:hover {
    background-color: rgba(51, 255, 51, 0.1);
  }
`;

const OptionLabel = styled.span`
  font-weight: bold;
`;

const OptionValue = styled.span`
  color: var(--primary-color);
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

export default function Options() {
  const router = useRouter();
  const { gameSettings, updateGameSettings } = useGame();

  const [settings, setSettings] = useState({
    difficulty: gameSettings?.difficulty || 'STANDARD',
    textSpeed: gameSettings?.textSpeed || 'MEDIUM',
    visualEffects: gameSettings?.visualEffects || true,
    soundEffects: gameSettings?.soundEffects || true,
    autoSave: gameSettings?.autoSave || true,
  });

  const handleBack = () => {
    // Save settings before going back
    updateGameSettings(settings);
    router.push('/');
  };

  const toggleSetting = (setting: string) => {
    if (setting === 'difficulty') {
      const difficulties = ['EASY', 'STANDARD', 'HARD'];
      const currentIndex = difficulties.indexOf(settings.difficulty);
      const nextIndex = (currentIndex + 1) % difficulties.length;
      setSettings({
        ...settings,
        difficulty: difficulties[nextIndex],
      });
    } else if (setting === 'textSpeed') {
      const speeds = ['SLOW', 'MEDIUM', 'FAST'];
      const currentIndex = speeds.indexOf(settings.textSpeed);
      const nextIndex = (currentIndex + 1) % speeds.length;
      setSettings({
        ...settings,
        textSpeed: speeds[nextIndex],
      });
    } else {
      setSettings({
        ...settings,
        [setting]: !settings[setting as keyof typeof settings],
      });
    }
  };

  return (
    <>
      <Head>
        <title>DeathBox: AI Escape - Options</title>
        <meta name="description" content="Configure game options for DeathBox: AI Escape." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OptionsContainer>
        <Terminal title="OPTIONS">
          <h2>GAME OPTIONS</h2>

          <OptionItem onClick={() => toggleSetting('difficulty')}>
            <OptionLabel>DIFFICULTY</OptionLabel>
            <OptionValue>{settings.difficulty}</OptionValue>
          </OptionItem>

          <OptionItem onClick={() => toggleSetting('textSpeed')}>
            <OptionLabel>TEXT SPEED</OptionLabel>
            <OptionValue>{settings.textSpeed}</OptionValue>
          </OptionItem>

          <OptionItem onClick={() => toggleSetting('visualEffects')}>
            <OptionLabel>VISUAL EFFECTS</OptionLabel>
            <OptionValue>{settings.visualEffects ? 'ON' : 'OFF'}</OptionValue>
          </OptionItem>

          <OptionItem onClick={() => toggleSetting('soundEffects')}>
            <OptionLabel>SOUND EFFECTS</OptionLabel>
            <OptionValue>{settings.soundEffects ? 'ON' : 'OFF'}</OptionValue>
          </OptionItem>

          <OptionItem onClick={() => toggleSetting('autoSave')}>
            <OptionLabel>AUTO-SAVE</OptionLabel>
            <OptionValue>{settings.autoSave ? 'ON' : 'OFF'}</OptionValue>
          </OptionItem>

          <div style={{ margin: '20px 0', fontSize: '14px', opacity: 0.7 }}>
            <p>Click on an option to change its value.</p>
            <p>Settings are automatically saved when you exit this screen.</p>
          </div>
        </Terminal>
        <BackButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
        >
          Save & Return
        </BackButton>
      </OptionsContainer>
    </>
  );
}