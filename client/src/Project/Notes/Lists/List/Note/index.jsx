import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { NoteLink, Note, Title, Bottom } from './Styles';

const propTypes = {
  note: PropTypes.object.isRequired,
};

const ProjectListNote = ({ note }) => {
  const match = useRouteMatch();

  return (
    <NoteLink to={`${match.url}/notes/${note.id}`} data-testid="list-note">
      <Note>
        <Title>{note.title}</Title>
        <Bottom>
          {/* 
          <div>
            <IssueTypeIcon type={note.type} />
            <IssuePriorityIcon priority={note.priority} top={0} left={4} />
          </div>
          <Assignees>
            {assignees.map(user => (
              <AssigneeAvatar
                key={user.id}
                size={24}
                avatarUrl={user.avatarUrl}
                name={user.name}
              />
            ))}
          </Assignees>
        </Bottom> */}
        </Bottom>
      </Note>
    </NoteLink>
  );
};

ProjectListNote.propTypes = propTypes;

export default ProjectListNote;
