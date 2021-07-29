import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Router } from '@reach/router';
import { HEADER_ALLOWANCE } from './utils/constants';
import { Home } from './content';
import {
  media,
  StyledContentContainer,
  StyledInfoContainer,
  Header as StyledHeader,
  H1,
  Columns,
  Column,
  Box
} from './content/StyledContent';
import { NOTES } from './constants/displayBoxNotes';
import { INFO } from './constants/patternInfo';

import InfoIllustration from './assets/light_bulb.svg';
import { useAnimatedBulb } from './content/useAnimatedBulb';
import { useAnimatedInfo } from './content/useAnimatedInfo';

const StyledAppBody = styled.div`
  background: #191921;
  padding: ${() => `${HEADER_ALLOWANCE / 6}vh 10px`};

  ${media.md`
    padding: ${() => `${HEADER_ALLOWANCE}vh 0`};
  `}
`;

const patterns = [
  'the-medium-clap',
  'compound-components',
  'extensible-styles',
  'control-props',
  'custom-hooks',
  'props-collection',
  'prop-getters',
  'state-initializers',
  'state-reducers'
];

const Header = ({ title, patternNumber }) => {
  // animated el
  const [{ lightBulbEl, infoEl, infoTextEl }, setRefState] = useState({});

  const setRef = useCallback((node) => {
    if (node !== null) {
      setRefState((prevRefState) => ({
        ...prevRefState,
        [node.dataset.refkey]: node
      }));
    }
  }, []);

  const animatedBulbTimeline = useAnimatedBulb({
    el: lightBulbEl
  });
  const animatedInfoTimeline = useAnimatedInfo({
    bgEl: infoEl,
    textEl: infoTextEl
  });

  // toggle info display
  const [isInfoShown, setInfoShown] = useState(false);

  const toggleInfo = () => {
    setInfoShown((isInfoShown) => !isInfoShown);
    animatedBulbTimeline.replay();
  };

  useEffect(() => {
    if (!isInfoShown) {
      return;
    }

    const timer = setTimeout(() => {
      animatedInfoTimeline.replay();
    }, 100);

    return () => clearTimeout(timer);
  }, [isInfoShown]);

  return (
    <StyledHeader>
      {isInfoShown && (
        <StyledInfoContainer ref={setRef} data-refkey="infoEl">
          <p ref={setRef} data-refkey="infoTextEl">
            {INFO[patternNumber]}
          </p>
        </StyledInfoContainer>
      )}
      <H1>{title}</H1>
      <div ref={setRef} data-refkey="lightBulbEl">
        <InfoIllustration
          style={{ width: '30px', marginLeft: '5px', cursor: 'pointer' }}
          onClick={toggleInfo}
        />
      </div>
    </StyledHeader>
  );
};

const RouteComponent = ({ pattern, patternNumber, isMediumOrLarger }) => {
  const firstLetterCap = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);
  const title = pattern.split('-').map(firstLetterCap).join(' ');

  const indexToTwoDigits = (i) => (i < 10 ? `0${i}` : i);
  const beforeAndAfterPatternNumbers = [patternNumber, patternNumber + 1].map(
    indexToTwoDigits
  );

  // Demo to be shown in Display Boxes
  let Demo1, Demo2;
  try {
    Demo1 = require(`./patterns/${beforeAndAfterPatternNumbers[0]}`).default;
  } catch (error) {
    Demo1 = () => null;
  }
  try {
    Demo2 = require(`./patterns/${beforeAndAfterPatternNumbers[1]}`).default;
  } catch (error) {
    Demo2 = () => null;
  }

  return (
    <StyledContentContainer>
      <Header title={title} patternNumber={patternNumber} />
      <Columns>
        <Column>
          <Box isPrimary note={NOTES[patternNumber]}>
            <Demo1 />
          </Box>
        </Column>
        <Column leftGap>
          <Box
            note={NOTES[patternNumber + 1]}
            m={!isMediumOrLarger && '15px 0 0 0'}
          >
            <Demo2 />
          </Box>
        </Column>
      </Columns>
    </StyledContentContainer>
  );
};

const Body = ({ isMediumOrLarger }) => {
  return (
    <StyledAppBody>
      <Router>
        <Home path="/" />
        {patterns.map((pattern, index) => (
          <RouteComponent
            path={pattern}
            key={pattern}
            pattern={pattern}
            patternNumber={index + 1}
            isMediumOrLarger={isMediumOrLarger}
          />
        ))}
      </Router>
    </StyledAppBody>
  );
};

export default Body;
