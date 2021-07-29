import React from 'react';
import styled from 'styled-components';
import HeroImage from '../assets/react-patterns.png';

import { SIDEBAR_LEFT_PADDING } from '../utils/constants';

const StyledContainer = styled.section`
  padding: ${() =>
    `0 ${SIDEBAR_LEFT_PADDING}vw 0 ${SIDEBAR_LEFT_PADDING * 3}vw`};
`;

export const Home = () => (
  <StyledContainer>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '2em' }}> React Component Design Patterns</h1>
      <img src={HeroImage} />
    </div>
  </StyledContainer>
);
