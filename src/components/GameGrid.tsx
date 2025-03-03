import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Level, Player } from '@/context/GameContext';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
  gap: 0;
  font-family: 'Courier New', monospace;
  line-height: 1;
  margin: 20px 0;
  border: 1px solid rgba(51, 255, 51, 0.3);
  padding: 5px;
`;

const Cell = styled.div<{ cellType: string }>`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${props => {
    switch (props.cellType) {
      case '@': return 'var(--player-color)';
      case '#': return 'var(--wall-color)';
      case '.': return 'var(--empty-color)';
      case 'G': return 'var(--guard-color)';
      case 'C': return 'var(--camera-color)';
      case 'D': return 'var(--door-color)';
      case 'T': return 'var(--terminal-color)';
      case 'E': return 'var(--exit-color)';
      case '?': return 'var(--data-color)';
      default: return 'var(--text-color)';
    }
  }};

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const PlayerCell = styled(motion.div)`
  color: var(--player-color);
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

type GameGridProps = {
  level: Level;
  player: Player;
};

const GameGrid = ({ level, player }: GameGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Render the game map with entities
  const renderGrid = () => {
    if (!level || !level.map) return null;

    // Create a copy of the map to place entities
    const displayMap = level.map.map(row => [...row]);

    // Place player
    displayMap[player.y][player.x] = '@';

    // Place guards
    level.guards.forEach(guard => {
      displayMap[guard.y][guard.x] = 'G';
    });

    // Place cameras
    level.cameras.forEach(camera => {
      displayMap[camera.y][camera.x] = 'C';
    });

    // Place terminals
    level.terminals.forEach(terminal => {
      if (!terminal.hacked) {
        displayMap[terminal.y][terminal.x] = 'T';
      }
    });

    // Place doors
    level.doors.forEach(door => {
      displayMap[door.y][door.x] = 'D';
    });

    // Place data fragments
    level.dataFragments.forEach(fragment => {
      if (!fragment.collected) {
        displayMap[fragment.y][fragment.x] = '?';
      }
    });

    // Place exit
    displayMap[level.exit.y][level.exit.x] = 'E';

    // Render the cells
    return displayMap.flat().map((cell, index) => (
      <Cell key={index} cellType={cell}>
        {cell}
      </Cell>
    ));
  };

  return (
    <GridContainer ref={gridRef} style={{ gridTemplateColumns: `repeat(${level.map[0].length}, 1fr)` }}>
      {renderGrid()}
    </GridContainer>
  );
};

export default GameGrid;