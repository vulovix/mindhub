import React from 'react';
import PropTypes from 'prop-types';

import { formatDateTimeConversational } from 'shared/utils/dateTime';

import { Dates } from './Styles';

const propTypes = {
  note: PropTypes.object.isRequired,
};

const ProjectBoardNoteDetailsDates = ({ note }) => (
  <Dates>
    <div>Created at {formatDateTimeConversational(note.createdAt)}</div>
    <div>Updated at {formatDateTimeConversational(note.updatedAt)}</div>
  </Dates>
);

ProjectBoardNoteDetailsDates.propTypes = propTypes;

export default ProjectBoardNoteDetailsDates;
