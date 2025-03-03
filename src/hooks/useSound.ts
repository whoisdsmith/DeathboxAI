import { useEffect, useRef, useState } from 'react';
import { useGame } from './useGame';

// Use browser Audio API instead of external sound files
export const useSoundEffects = () => {
  const { gameSettings } = useGame();
  const soundEnabled = gameSettings.soundEffects;
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Initialize AudioContext on first interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!audioContext) {
        const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(newAudioContext);
      }

      // Remove event listeners after initialization
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [audioContext]);

  // Generate a beep sound with specified parameters
  const generateBeep = (
    frequency: number = 440,
    duration: number = 0.1,
    volume: number = 0.1,
    type: OscillatorType = 'sine'
  ) => {
    if (!soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = volume;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };

  // Movement sound effect
  const playMove = () => {
    if (!soundEnabled) return;
    generateBeep(220, 0.05, 0.05, 'square');
  };

  // Hack sound effect
  const playHack = () => {
    if (!soundEnabled) return;

    // Create a sequence of beeps for hacking
    if (audioContext) {
      const now = audioContext.currentTime;
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          generateBeep(440 + i * 100, 0.05, 0.05, 'sawtooth');
        }, i * 50);
      }
    }
  };

  // Alert sound effect
  const playAlert = () => {
    if (!soundEnabled) return;
    generateBeep(880, 0.3, 0.1, 'square');
  };

  // Success sound effect
  const playSuccess = () => {
    if (!soundEnabled) return;

    // Create a sequence of beeps for success
    if (audioContext) {
      const now = audioContext.currentTime;
      setTimeout(() => generateBeep(440, 0.1, 0.05, 'sine'), 0);
      setTimeout(() => generateBeep(554, 0.1, 0.05, 'sine'), 100);
      setTimeout(() => generateBeep(659, 0.2, 0.05, 'sine'), 200);
    }
  };

  // Game over sound effect
  const playGameOver = () => {
    if (!soundEnabled) return;

    // Create a sequence of beeps for game over
    if (audioContext) {
      const now = audioContext.currentTime;
      setTimeout(() => generateBeep(440, 0.2, 0.1, 'sawtooth'), 0);
      setTimeout(() => generateBeep(415, 0.2, 0.1, 'sawtooth'), 200);
      setTimeout(() => generateBeep(392, 0.2, 0.1, 'sawtooth'), 400);
      setTimeout(() => generateBeep(349, 0.4, 0.1, 'sawtooth'), 600);
    }
  };

  // Victory sound effect
  const playVictory = () => {
    if (!soundEnabled) return;

    // Create a sequence of beeps for victory
    if (audioContext) {
      const now = audioContext.currentTime;
      setTimeout(() => generateBeep(440, 0.1, 0.05, 'sine'), 0);
      setTimeout(() => generateBeep(554, 0.1, 0.05, 'sine'), 100);
      setTimeout(() => generateBeep(659, 0.1, 0.05, 'sine'), 200);
      setTimeout(() => generateBeep(880, 0.3, 0.05, 'sine'), 300);
    }
  };

  return {
    playMove,
    playHack,
    playAlert,
    playSuccess,
    playGameOver,
    playVictory,
  };
};

export const useTerminalSound = () => {
  const { gameSettings } = useGame();
  const soundEnabled = gameSettings.soundEffects;
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Initialize AudioContext on first interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!audioContext) {
        const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(newAudioContext);
      }

      // Remove event listeners after initialization
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [audioContext]);

  // Generate a beep sound with specified parameters
  const generateBeep = (
    frequency: number = 440,
    duration: number = 0.1,
    volume: number = 0.1,
    type: OscillatorType = 'sine'
  ) => {
    if (!soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = volume;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };

  // Typing sound effect
  const playTyping = () => {
    if (!soundEnabled) return;
    generateBeep(220, 0.02, 0.02, 'square');
  };

  // Terminal beep sound effect
  const playBeep = () => {
    if (!soundEnabled) return;
    generateBeep(440, 0.1, 0.05, 'sine');
  };

  // Terminal error sound effect
  const playError = () => {
    if (!soundEnabled) return;
    generateBeep(220, 0.2, 0.1, 'sawtooth');
  };

  return {
    playTyping,
    playBeep,
    playError,
  };
};