import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import useApi from 'shared/hooks/api';
import { PageError, CopyLinkButton, Button } from 'shared/components';

import Loader from './Loader';
import Delete from './Delete';
import Title from './Title';
import Description from './Description';
import { TopActions, TopActionsRight, Content, Left, Right } from './Styles';
import Dates from './Dates';
import AssigneesReporter from './AssigneesReporter';

const propTypes = {
  noteId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectNotes: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardNoteDetails = ({
  noteId,
  projectUsers,
  fetchProject,
  updateLocalProjectNotes,
  modalClose,
}) => {
  const [{ data, error, setLocalData }] = useApi.get(`/notes/${noteId}`);

  if (!data) return <Loader />;
  if (error) return <PageError />;

  const { note } = data;

  const updateLocalNoteDetails = fields =>
    setLocalData(currentData => ({ note: { ...currentData.note, ...fields } }));

  const updateNote = updatedFields => {
    api.optimisticUpdate(`/notes/${noteId}`, {
      updatedFields,
      currentFields: note,
      setLocalData: fields => {
        updateLocalNoteDetails(fields);
        updateLocalProjectNotes(note.id, fields);
      },
    });
  };

  return (
    <Fragment>
      <TopActions>
        <Title note={note} updateNote={updateNote} />
        <TopActionsRight>
          <CopyLinkButton variant="empty" />
          <Delete note={note} fetchProject={fetchProject} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <Description note={note} updateNote={updateNote} />
        </Left>
        <Right>
          <AssigneesReporter note={note} updateNote={updateNote} projectUsers={projectUsers} />
          <Dates note={note} />
        </Right>
      </Content>
    </Fragment>
  );
};

ProjectBoardNoteDetails.propTypes = propTypes;

export default ProjectBoardNoteDetails;
