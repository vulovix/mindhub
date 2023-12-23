import React from 'react';
import PropTypes from 'prop-types';

import { Icon, AboutTooltip } from 'shared/components';

import { Divider, NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText } from './Styles';

const propTypes = {
  issueSearchModalOpen: PropTypes.func.isRequired,
  noteSearchModalOpen: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired,
  noteCreateModalOpen: PropTypes.func.isRequired,
};

const ProjectNavbarLeft = ({
  noteSearchModalOpen,
  issueSearchModalOpen,
  issueCreateModalOpen,
  noteCreateModalOpen,
}) => (
  <NavLeft>
    <LogoLink to="/">
      <StyledLogo color="#fff" />
      <ItemText>Mindspace</ItemText>
    </LogoLink>

    <Divider />

    <Item onClick={issueSearchModalOpen}>
      <Icon type="search" size={22} left={3} />
      <ItemText>Search issues</ItemText>
    </Item>

    <Item onClick={issueCreateModalOpen}>
      <Icon type="plus" size={27} />
      <ItemText>Create Issue</ItemText>
    </Item>

    <Divider />

    <Item onClick={noteSearchModalOpen}>
      <Icon type="search" size={22} left={3} />
      <ItemText>Search notes</ItemText>
    </Item>

    <Item onClick={noteCreateModalOpen}>
      <Icon type="plus" size={27} />
      <ItemText>Create Note</ItemText>
    </Item>

    <Divider />

    <Bottom>
      <AboutTooltip
        placement="right"
        offset={{ top: -218 }}
        renderLink={linkProps => (
          <Item {...linkProps}>
            <Icon type="help" size={25} />
            <ItemText>About</ItemText>
          </Item>
        )}
      />
    </Bottom>
  </NavLeft>
);

ProjectNavbarLeft.propTypes = propTypes;

export default ProjectNavbarLeft;
