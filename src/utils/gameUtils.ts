import { Level, EntityPosition } from '@/context/GameContext';

/**
 * Calculate the distance between two positions
 */
export const calculateDistance = (pos1: EntityPosition, pos2: EntityPosition): number => {
  return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
};

/**
 * Check if a position is within the map boundaries
 */
export const isWithinBounds = (pos: EntityPosition, map: string[][]): boolean => {
  return (
    pos.x >= 0 &&
    pos.x < map[0].length &&
    pos.y >= 0 &&
    pos.y < map.length
  );
};

/**
 * Check if a position is a wall
 */
export const isWall = (pos: EntityPosition, map: string[][]): boolean => {
  if (!isWithinBounds(pos, map)) return true;
  return map[pos.y][pos.x] === '#';
};

/**
 * Get the character at a specific position in the map
 */
export const getMapCell = (pos: EntityPosition, map: string[][]): string => {
  if (!isWithinBounds(pos, map)) return '#';
  return map[pos.y][pos.x];
};

/**
 * Create a deep copy of a level
 */
export const cloneLevel = (level: Level): Level => {
  return {
    map: level.map.map(row => [...row]),
    player: { ...level.player },
    guards: level.guards.map(guard => ({
      ...guard,
      patrolPath: guard.patrolPath.map(pos => ({ ...pos })),
    })),
    cameras: level.cameras.map(camera => ({ ...camera })),
    terminals: level.terminals.map(terminal => ({ ...terminal })),
    doors: level.doors.map(door => ({ ...door })),
    dataFragments: level.dataFragments.map(fragment => ({ ...fragment })),
    exit: { ...level.exit },
  };
};