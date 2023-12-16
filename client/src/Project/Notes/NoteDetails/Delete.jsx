import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { Button, ConfirmModal } from 'shared/components';

const propTypes = {
  note: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectNoteDetailsDelete = ({ note, fetchProject, modalClose }) => {
  const handleNoteDelete = async () => {
    try {
      await api.delete(`/notes/${note.id}`);
      await fetchProject();
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title="Are you sure you want to delete this note?"
      message="Once you delete, it's gone for good."
      confirmText="Delete note"
      onConfirm={handleNoteDelete}
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

ProjectNoteDetailsDelete.propTypes = propTypes;

export default ProjectNoteDetailsDelete;
