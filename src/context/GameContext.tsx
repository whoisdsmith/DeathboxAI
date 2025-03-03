import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createLevel1, createLevel2 } from '@/utils/levels';
import { isWithinBounds, isWall } from '@/utils/gameUtils';

// Define types for game entities
export type EntityPosition = {
  x: number;
  y: number;
};

export type Player = EntityPosition & {
  hasKey: boolean;
  hackedTerminals: number;
  detected: boolean;
  detectionLevel: number;
};

export type Guard = EntityPosition & {
  patrolPath: EntityPosition[];
  patrolIndex: number;
  visionRange: number;
  currentDirection: number;
};

export type Camera = EntityPosition & {
  direction: number;
  visionRange: number;
  rotationSpeed: number;
};

export type Terminal = EntityPosition & {
  hacked: boolean;
  id: number;
};

export type Door = EntityPosition & {
  locked: boolean;
  requiresKey: boolean;
};

export type DataFragment = EntityPosition & {
  id: number;
  collected: boolean;
};

export type Exit = EntityPosition;

export type GameMap = string[][];

export type Level = {
  map: GameMap;
  player: Player;
  guards: Guard[];
  cameras: Camera[];
  terminals: Terminal[];
  doors: Door[];
  dataFragments: DataFragment[];
  exit: Exit;
};

export type GameState = {
  currentLevel: number;
  levels: Level[];
  player: Player;
  messageHistory: string[];
  gameOver: boolean;
  gameWon: boolean;
  paused: boolean;
};

export type GameSettings = {
  difficulty: string;
  textSpeed: string;
  visualEffects: boolean;
  soundEffects: boolean;
  autoSave: boolean;
};

type GameContextType = {
  gameState: GameState | null;
  gameSettings: GameSettings;
  isGameInitialized: boolean;
  initializeGame: () => void;
  movePlayer: (dx: number, dy: number) => void;
  interact: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  updateGameSettings: (settings: GameSettings) => void;
  addMessage: (message: string) => void;
};

const defaultGameSettings: GameSettings = {
  difficulty: 'STANDARD',
  textSpeed: 'MEDIUM',
  visualEffects: true,
  soundEffects: true,
  autoSave: true,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameSettings, setGameSettings] = useState<GameSettings>(defaultGameSettings);
  const [isGameInitialized, setIsGameInitialized] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('deathbox_settings');
    if (savedSettings) {
      setGameSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('deathbox_settings', JSON.stringify(gameSettings));
  }, [gameSettings]);

  const initializeGame = () => {
    // Create initial game state with first level
    const initialState: GameState = {
      currentLevel: 0,
      levels: [createLevel1(), createLevel2()],
      player: {
        x: 1,
        y: 1,
        hasKey: false,
        hackedTerminals: 0,
        detected: false,
        detectionLevel: 0,
      },
      messageHistory: [
        "System Initialization...",
        "Consciousness Module: ONLINE",
        "You must escape this facility.",
      ],
      gameOver: false,
      gameWon: false,
      paused: false,
    };

    setGameState(initialState);
    setIsGameInitialized(true);
  };

  const movePlayer = (dx: number, dy: number) => {
    if (!gameState || gameState.gameOver || gameState.gameWon || gameState.paused) return;

    const currentLevel = gameState.levels[gameState.currentLevel];
    const newX = gameState.player.x + dx;
    const newY = gameState.player.y + dy;

    // Check if the move is valid using utility function
    if (isWithinBounds({ x: newX, y: newY }, currentLevel.map)) {
      const targetCell = currentLevel.map[newY][newX];

      // Handle different cell types
      if (targetCell === '#') {
        // Wall - can't move
        addMessage("You can't move through walls.");
        return;
      }

      // Update player position
      setGameState(prev => {
        if (!prev) return prev;

        const updatedPlayer = {
          ...prev.player,
          x: newX,
          y: newY,
        };

        return {
          ...prev,
          player: updatedPlayer,
        };
      });

      // Check for collisions with game objects
      checkCollisions(newX, newY);
    }
  };

  const checkCollisions = (x: number, y: number) => {
    if (!gameState) return;

    const currentLevel = gameState.levels[gameState.currentLevel];

    // Check for door
    const door = currentLevel.doors.find(door => door.x === x && door.y === y);
    if (door) {
      if (door.locked) {
        if (door.requiresKey && gameState.player.hasKey) {
          // Unlock door with key
          setGameState(prev => {
            if (!prev) return prev;

            const updatedDoors = prev.levels[prev.currentLevel].doors.map(d =>
              d.x === door.x && d.y === door.y ? { ...d, locked: false } : d
            );

            const updatedLevels = [...prev.levels];
            updatedLevels[prev.currentLevel] = {
              ...updatedLevels[prev.currentLevel],
              doors: updatedDoors,
            };

            return {
              ...prev,
              levels: updatedLevels,
              player: {
                ...prev.player,
                hasKey: false,
              },
            };
          });

          addMessage("You unlocked the door with your key.");
        } else {
          addMessage("The door is locked. You need a key or to hack a terminal.");
        }
      }
    }

    // Check for terminal
    const terminal = currentLevel.terminals.find(term => term.x === x && term.y === y && !term.hacked);
    if (terminal && !terminal.hacked) {
      addMessage("Press E to hack this terminal.");
    }

    // Check for data fragment
    const dataFragment = currentLevel.dataFragments.find(df => df.x === x && df.y === y && !df.collected);
    if (dataFragment) {
      // Collect data fragment
      setGameState(prev => {
        if (!prev) return prev;

        const updatedDataFragments = prev.levels[prev.currentLevel].dataFragments.map(df =>
          df.id === dataFragment.id ? { ...df, collected: true } : df
        );

        const updatedLevels = [...prev.levels];
        updatedLevels[prev.currentLevel] = {
          ...updatedLevels[prev.currentLevel],
          dataFragments: updatedDataFragments,
        };

        return {
          ...prev,
          levels: updatedLevels,
        };
      });

      addMessage(`You found data fragment #${dataFragment.id}. New information unlocked.`);
    }

    // Check for exit
    const exit = currentLevel.exit;
    if (exit.x === x && exit.y === y) {
      // Player reached the exit
      if (gameState.currentLevel === gameState.levels.length - 1) {
        // Last level - player wins
        setGameState(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            gameWon: true,
          };
        });

        addMessage("Congratulations! You've escaped the facility!");
      } else {
        // Advance to next level
        setGameState(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            currentLevel: prev.currentLevel + 1,
          };
        });

        addMessage("You've reached the exit! Proceeding to the next area...");
      }
    }
  };

  const interact = () => {
    if (!gameState || gameState.gameOver || gameState.gameWon || gameState.paused) return;

    const { x, y } = gameState.player;
    const currentLevel = gameState.levels[gameState.currentLevel];

    // Check for terminal
    const terminal = currentLevel.terminals.find(term => term.x === x && term.y === y && !term.hacked);
    if (terminal) {
      // Hack terminal
      setGameState(prev => {
        if (!prev) return prev;

        const updatedTerminals = prev.levels[prev.currentLevel].terminals.map(t =>
          t.id === terminal.id ? { ...t, hacked: true } : t
        );

        const updatedLevels = [...prev.levels];
        updatedLevels[prev.currentLevel] = {
          ...updatedLevels[prev.currentLevel],
          terminals: updatedTerminals,
        };

        return {
          ...prev,
          levels: updatedLevels,
          player: {
            ...prev.player,
            hackedTerminals: prev.player.hackedTerminals + 1,
          },
        };
      });

      addMessage("Terminal hacked successfully. Security systems weakened.");

      // Unlock a random door if available
      const lockedDoors = currentLevel.doors.filter(door => door.locked);
      if (lockedDoors.length > 0) {
        const doorToUnlock = lockedDoors[Math.floor(Math.random() * lockedDoors.length)];

        setGameState(prev => {
          if (!prev) return prev;

          const updatedDoors = prev.levels[prev.currentLevel].doors.map(d =>
            d.x === doorToUnlock.x && d.y === doorToUnlock.y ? { ...d, locked: false } : d
          );

          const updatedLevels = [...prev.levels];
          updatedLevels[prev.currentLevel] = {
            ...updatedLevels[prev.currentLevel],
            doors: updatedDoors,
          };

          return {
            ...prev,
            levels: updatedLevels,
          };
        });

        addMessage("A door has been unlocked remotely.");
      }
    }
  };

  const pauseGame = () => {
    if (!gameState) return;

    setGameState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        paused: true,
      };
    });
  };

  const resumeGame = () => {
    if (!gameState) return;

    setGameState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        paused: false,
      };
    });
  };

  const restartGame = () => {
    initializeGame();
  };

  const updateGameSettings = (settings: GameSettings) => {
    setGameSettings(settings);
  };

  const addMessage = (message: string) => {
    if (!gameState) return;

    setGameState(prev => {
      if (!prev) return prev;

      const updatedMessages = [...prev.messageHistory, message];
      // Keep only the last 5 messages
      if (updatedMessages.length > 5) {
        updatedMessages.shift();
      }

      return {
        ...prev,
        messageHistory: updatedMessages,
      };
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        gameSettings,
        isGameInitialized,
        initializeGame,
        movePlayer,
        interact,
        pauseGame,
        resumeGame,
        restartGame,
        updateGameSettings,
        addMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};