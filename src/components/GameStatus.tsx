import React from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid rgba(51, 255, 51, 0.3);
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    flex-direction: column;
    font-size: 0.8rem;
  }
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    margin-bottom: 0.3rem;
  }
`;

const StatusLabel = styled.span`
  margin-right: 0.5rem;
  opacity: 0.7;
`;

const StatusValue = styled.span`
  color: var(--primary-color);
  font-weight: bold;
`;

type GameStatusProps = {
  level: number;
  terminals: number;
  dataFragments: number;
  totalDataFragments: number;
};

const GameStatus = ({
  level,
  terminals,
  dataFragments,
  totalDataFragments
}: GameStatusProps) => {
  return (
    <StatusContainer>
      <StatusItem>
        <StatusLabel>LEVEL:</StatusLabel>
        <StatusValue>{level}</StatusValue>
      </StatusItem>

      <StatusItem>
        <StatusLabel>TERMINALS:</StatusLabel>
        <StatusValue>{terminals}</StatusValue>
      </StatusItem>

      <StatusItem>
        <StatusLabel>DATA:</StatusLabel>
        <StatusValue>{dataFragments}/{totalDataFragments}</StatusValue>
      </StatusItem>
    </StatusContainer>
  );
};

export default GameStatus;