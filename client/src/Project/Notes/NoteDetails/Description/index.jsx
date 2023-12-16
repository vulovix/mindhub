import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { getTextContentsFromHtmlString } from 'shared/utils/browser';
import { TextEditor, TextEditedContent, Button } from 'shared/components';

import { Title, EmptyLabel, Actions } from './Styles';

const propTypes = {
  note: PropTypes.object.isRequired,
  updateNote: PropTypes.func.isRequired,
};

const ProjectNoteDetailsDescription = ({ note, updateNote }) => {
  const [description, setDescription] = useState(note.description);
  const [isEditing, setEditing] = useState(false);

  const handleUpdate = () => {
    setEditing(false);
    updateNote({ description });
  };

  const isDescriptionEmpty = getTextContentsFromHtmlString(description).trim().length === 0;

  return (
    <Fragment>
      <Title>Description</Title>
      {isEditing ? (
        <Fragment>
          <TextEditor
            placeholder="Describe the note"
            defaultValue={description}
            onChange={setDescription}
          />
          <Actions>
            <Button variant="primary" onClick={handleUpdate}>
              Save
            </Button>
            <Button variant="empty" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </Actions>
        </Fragment>
      ) : (
        <Fragment>
          {isDescriptionEmpty ? (
            <EmptyLabel onClick={() => setEditing(true)}>Add a description...</EmptyLabel>
          ) : (
            <TextEditedContent content={description} onClick={() => setEditing(true)} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectNoteDetailsDescription.propTypes = propTypes;

export default ProjectNoteDetailsDescription;
