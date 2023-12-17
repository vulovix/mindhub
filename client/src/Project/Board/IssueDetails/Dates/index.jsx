import React from 'react';
import PropTypes from 'prop-types';

import { formatDateTimeConversational } from 'shared/utils/dateTime';

import { Dates } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
};

const ProjectBoardIssueDetailsDates = ({ issue }) => (
  <React.Fragment>
    <Dates>
      <div>Created {formatDateTimeConversational(issue.createdAt)} &middot;&nbsp;</div>
      <div>Updated {formatDateTimeConversational(issue.updatedAt)}</div>
    </Dates>
  </React.Fragment>
);

ProjectBoardIssueDetailsDates.propTypes = propTypes;

export default ProjectBoardIssueDetailsDates;
