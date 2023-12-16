import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Note from './Note';
import { List, Notes } from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  currentUserId: PropTypes.number,
};

const defaultProps = {
  currentUserId: null,
};

const ProjectNoteList = ({ project, filters, currentUserId }) => {
  const filteredNotes = filterNotes(project.notes, filters, currentUserId);
  const filteredListNotes = filteredNotes;
  return (
    <List>
      <Notes data-testid="board-list-notes">
        {filteredListNotes.map((note, index) => (
          <Note key={note.id} projectUsers={project.users} note={note} index={index} />
        ))}
      </Notes>
    </List>
  );
};

const filterNotes = (projectNotes, filters) => {
  const { searchTerm, recent } = filters;
  let notes = projectNotes;

  if (searchTerm) {
    notes = notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (recent) {
    notes = notes.filter(note => moment(note.updatedAt).isAfter(moment().subtract(3, 'days')));
  }
  return notes;
};

ProjectNoteList.propTypes = propTypes;
ProjectNoteList.defaultProps = defaultProps;

export default ProjectNoteList;
