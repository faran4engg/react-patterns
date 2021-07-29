import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import {
  HEADER_ALLOWANCE,
  SIDEBAR_LEFT_PADDING,
  LIGHTER_GREY,
  LIGHT_PURPLE,
  GREY,
  zIndex
} from './utils/constants';

import { media } from './content/StyledContent';

const StyledSidebar = styled.div`
  background: #0f0f14;
  padding: ${() => `0 ${SIDEBAR_LEFT_PADDING}vw`};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex.SIDEBAR};
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4), 0 6px 6px rgba(0, 0, 0, 0.4);

  ${media.md`
    position: initial;
    box-shadow: none;
  `}
`;

const StyledNavigation = styled.nav`
  padding: 0;
  margin: 0;
  margin-top: ${() => `${HEADER_ALLOWANCE / 6}vh`};
  > a {
    display: block;
    padding-left: ${() => `${SIDEBAR_LEFT_PADDING / 2}vw`};
    padding-top: ${() => `${SIDEBAR_LEFT_PADDING}vw`};
    padding-bottom: ${() => `${SIDEBAR_LEFT_PADDING}vw`};
    margin-bottom: 7px;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;
    color: ${() => `${LIGHTER_GREY}`};
  }

  ${media.md`
    margin-top: ${() => `${HEADER_ALLOWANCE}vh`};

    > a {
      padding-top: ${() => `${SIDEBAR_LEFT_PADDING / 3}vw`};
      padding-bottom: ${() => `${SIDEBAR_LEFT_PADDING / 3}vw`};
    }

    > a:hover {
      color: ${() => `${LIGHT_PURPLE}`}
    }
  `}
`;

const NAV_ITEMS = [
  'Home',
  'The Medium Clap',
  'Compound Components',
  'Extensible Styles',
  'Control Props',
  'Custom Hooks',
  'Props Collection',
  'Prop Getters',
  'State Initializers',
  'State Reducers'
];

const Sidebar = ({ setShowSidebar }) => {
  const handleClick = () => setShowSidebar((v) => !v);
  return (
    <StyledSidebar onClick={handleClick}>
      <StyledNavigation>
        {NAV_ITEMS.map((item) => (
          <Link
            getProps={({ isCurrent }) => ({
              style: {
                background: isCurrent ? GREY : ''
              }
            })}
            key={item}
            to={item === 'Home' ? '/' : item.toLowerCase().split(' ').join('-')}
          >
            {item}
          </Link>
        ))}
      </StyledNavigation>
    </StyledSidebar>
  );
};

export default Sidebar;
