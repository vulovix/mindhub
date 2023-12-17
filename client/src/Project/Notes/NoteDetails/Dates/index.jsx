import React from 'react';
import PropTypes from 'prop-types';

import { formatDateTimeConversational } from 'shared/utils/dateTime';

import { Dates } from './Styles';

const propTypes = {
  note: PropTypes.object.isRequired,
};

const ProjectBoardNoteDetailsDates = ({ note }) => (
  <React.Fragment>
    <Dates>
      <div>Updated {formatDateTimeConversational(note.updatedAt)} &middot;&nbsp;</div>
      <div>Created {formatDateTimeConversational(note.createdAt)}</div>
    </Dates>
  </React.Fragment>
);

ProjectBoardNoteDetailsDates.propTypes = propTypes;

export default ProjectBoardNoteDetailsDates;
