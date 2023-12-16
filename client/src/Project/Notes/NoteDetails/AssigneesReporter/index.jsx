import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Select, Icon } from 'shared/components';

import { SectionTitle } from '../Styles';
import { User, Username } from './Styles';

const propTypes = {
  note: PropTypes.object.isRequired,
  updateNote: PropTypes.func.isRequired,
  projectUsers: PropTypes.array.isRequired,
};

const ProjectBoardNoteDetailsAssigneesReporter = ({ note, updateNote, projectUsers }) => {
  const getUserById = userId => projectUsers.find(user => user.id === userId);

  const userOptions = projectUsers.map(user => ({ value: user.id, label: user.name }));

  return (
    <Fragment>
      <SectionTitle>Creator</SectionTitle>
      <Select
        variant="empty"
        dropdownWidth={343}
        withClearValue={false}
        name="reporter"
        value={note.creatorId}
        options={userOptions}
        onChange={userId => updateNote({ creatorId: userId })}
        renderValue={({ value: userId }) => renderUser(getUserById(userId), true)}
        renderOption={({ value: userId }) => renderUser(getUserById(userId))}
      />
    </Fragment>
  );
};

const renderUser = (user, isSelectValue, removeOptionValue) => (
  <User
    key={user.id}
    isSelectValue={isSelectValue}
    withBottomMargin={!!removeOptionValue}
    onClick={() => removeOptionValue && removeOptionValue()}
  >
    <Avatar avatarUrl={user.avatarUrl} name={user.name} size={24} />
    <Username>{user.name}</Username>
    {removeOptionValue && <Icon type="close" top={1} />}
  </User>
);

ProjectBoardNoteDetailsAssigneesReporter.propTypes = propTypes;

export default ProjectBoardNoteDetailsAssigneesReporter;
