import React from 'react';
import PropTypes from 'prop-types';

import useCurrentUser from 'shared/hooks/currentUser';

import List from './List';
import { Lists } from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
};

const ProjectNoteLists = ({ project, filters }) => {
  const { currentUserId } = useCurrentUser();

  return (
    <Lists>
      <List project={project} filters={filters} currentUserId={currentUserId} />
    </Lists>
  );
};

ProjectNoteLists.propTypes = propTypes;

export default ProjectNoteLists;
