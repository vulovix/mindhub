import React from 'react';
import PropTypes from 'prop-types';

import { Icon, AboutTooltip } from 'shared/components';

import { Divider, NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText, PagesNav } from './Styles';

const propTypes = {
  issueSearchModalOpen: PropTypes.func.isRequired,
  noteSearchModalOpen: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired,
  noteCreateModalOpen: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

const ProjectNavbarLeft = ({
  noteSearchModalOpen,
  issueSearchModalOpen,
  issueCreateModalOpen,
  noteCreateModalOpen,
  onNavigate,
}) => (
  <NavLeft>
    <LogoLink to="/">
      <StyledLogo color="#fff" />
      <ItemText>MindHub</ItemText>
    </LogoLink>

    <PagesNav>
      <Divider />
      <Item onClick={() => onNavigate('board')}>
        <Icon type="board" size={24} />
        <ItemText>Board</ItemText>
      </Item>

      <Item onClick={() => onNavigate('notes')}>
        <Icon type="page" size={24} />
        <ItemText>Notes</ItemText>
      </Item>

      <Item onClick={() => onNavigate('intelligence')}>
        <Icon type="component" size={24} />
        <ItemText>Intelligence</ItemText>
      </Item>

      <Item onClick={() => onNavigate('preferences')}>
        <Icon type="settings" size={24} />
        <ItemText>Preferences</ItemText>
      </Item>
    </PagesNav>

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
