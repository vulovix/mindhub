import React from 'react';
import PropTypes from 'prop-types';

import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import useCurrentUser from 'shared/hooks/currentUser';
import { Form } from 'shared/components';

import { FormHeading, FormElement, Actions, ActionButton } from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const NoteCreate = ({ project, fetchProject, onCreate, modalClose }) => {
  const [{ isCreating }, createNote] = useApi.post('/notes');

  const { currentUserId } = useCurrentUser();

  return (
    <Form
      enableReinitialize
      initialValues={{
        title: '',
        description: '',
        creatorId: currentUserId,
      }}
      validations={{
        title: [Form.is.required(), Form.is.maxLength(200)],
        creatorId: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createNote({
            ...values,
            projectId: project.id,
          });
          await fetchProject();
          toast.success('Note has been successfully created.');
          onCreate();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create Note</FormHeading>
        <Form.Field.Input
          name="title"
          label="Short Summary"
          tip="Concisely summarize the note in one or two sentences."
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Describe the note in as much detail as you'd like."
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Note
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

NoteCreate.propTypes = propTypes;

export default NoteCreate;
