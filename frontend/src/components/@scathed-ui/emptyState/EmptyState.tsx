import React from 'react';
import styled from 'styled-components';
import EmptyStateIcon, { EmptyStateIconKey } from './EmptyStateIcon';

interface Props {
  title: string;
  icon: EmptyStateIconKey;
}

const EmptyState: React.FC<Props> = ({ title, icon }) => {
  return (
    <StyledEmptyState>
      {icon && <EmptyStateIcon icon={icon} />}
      <h3>{title}</h3>
    </StyledEmptyState>
  );
};

export default EmptyState;

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  > h3 {
    color: #525252;
    margin-top: -1.5rem;
    font-size: 1.5rem;
  }

  > svg {
    color: #525252;
  }
`;
