import { Level } from '@/context/GameContext';

/**
 * Create the first level of the game
 */
export const createLevel1 = (): Level => {
  const mapData = [
    "#####################",
    "#@.................#",
    "#...................#",
    "#....##########....#",
    "#....#........#....#",
    "#....#........#....#",
    "#....#........#....#",
    "#....#........#....#",
    "#....#........#....#",
    "#....#........#....#",
    "#....#........#....#",
    "#....#........#....#",
    "#....#........#....#",
    "#....#........#....#",
    "#....#........#....#",
    "#....#........#....#",
    "#....#........#....#",
    "#..............D...E#",
    "#####################",
  ];

  // Convert string map to 2D array
  const map: string[][] = mapData.map(row => row.split(''));

  return {
    map,
    player: { x: 1, y: 1, hasKey: false, hackedTerminals: 0, detected: false, detectionLevel: 0 },
    guards: [
      {
        x: 10,
        y: 5,
        patrolPath: [
          { x: 10, y: 5 },
          { x: 10, y: 10 },
          { x: 15, y: 10 },
          { x: 15, y: 5 },
        ],
        patrolIndex: 0,
        visionRange: 3,
        currentDirection: 0,
      }
    ],
    cameras: [
      {
        x: 5,
        y: 15,
        direction: 0, // 0: up, 1: right, 2: down, 3: left
        visionRange: 4,
        rotationSpeed: 1,
      }
    ],
    terminals: [
      { x: 3, y: 15, hacked: false, id: 1 },
      { x: 15, y: 3, hacked: false, id: 2 },
    ],
    doors: [
      { x: 18, y: 17, locked: true, requiresKey: false },
    ],
    dataFragments: [
      { x: 5, y: 5, id: 1, collected: false },
      { x: 15, y: 15, id: 2, collected: false },
    ],
    exit: { x: 19, y: 17 },
  };
};

/**
 * Create the second level of the game
 */
export const createLevel2 = (): Level => {
  const mapData = [
    "#####################",
    "#@................T#",
    "#...................#",
    "#...###.....###....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#.........#....#",
    "#...#..........D..E#",
    "#####################",
  ];

  // Convert string map to 2D array
  const map: string[][] = mapData.map(row => row.split(''));

  return {
    map,
    player: { x: 1, y: 1, hasKey: false, hackedTerminals: 0, detected: false, detectionLevel: 0 },
    guards: [
      {
        x: 10,
        y: 5,
        patrolPath: [
          { x: 10, y: 5 },
          { x: 10, y: 10 },
          { x: 15, y: 10 },
          { x: 15, y: 5 },
        ],
        patrolIndex: 0,
        visionRange: 4,
        currentDirection: 0,
      },
      {
        x: 5,
        y: 12,
        patrolPath: [
          { x: 5, y: 12 },
          { x: 5, y: 16 },
          { x: 10, y: 16 },
          { x: 10, y: 12 },
        ],
        patrolIndex: 0,
        visionRange: 3,
        currentDirection: 0,
      }
    ],
    cameras: [
      {
        x: 15,
        y: 5,
        direction: 0,
        visionRange: 5,
        rotationSpeed: 1,
      },
      {
        x: 3,
        y: 15,
        direction: 1,
        visionRange: 4,
        rotationSpeed: 1,
      }
    ],
    terminals: [
      { x: 19, y: 1, hacked: false, id: 1 },
      { x: 10, y: 15, hacked: false, id: 2 },
    ],
    doors: [
      { x: 18, y: 17, locked: true, requiresKey: true },
    ],
    dataFragments: [
      { x: 5, y: 5, id: 1, collected: false },
      { x: 15, y: 15, id: 2, collected: false },
      { x: 10, y: 10, id: 3, collected: false },
    ],
    exit: { x: 19, y: 17 },
  };
};