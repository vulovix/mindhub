import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';

import useMergeState from 'shared/hooks/mergeState';
import { /* Breadcrumbs, */ Modal } from 'shared/components';

import Header from './Header';
import Filters from './Filters';
import Lists from './Lists';
import NoteDetails from './NoteDetails';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectNotes: PropTypes.func.isRequired,
};

const defaultFilters = {
  searchTerm: '',
  userIds: [],
  recent: false,
};

const Notes = ({ project, fetchProject, updateLocalProjectNotes }) => {
  const match = useRouteMatch();
  const history = useHistory();

  const [filters, mergeFilters] = useMergeState(defaultFilters);
  return (
    <Fragment>
      {/* <Breadcrumbs items={['Projects', project.name, 'Kanban Board']} /> */}
      <Header />
      <Filters
        projectUsers={project.users}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <Lists project={project} filters={filters} />
      <Route
        path={`${match.path}/notes/:noteId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:note-details"
            width={1040}
            withCloseIcon={false}
            onClose={() => history.push(match.url)}
            renderContent={modal => (
              <NoteDetails
                noteId={routeProps.match.params.noteId}
                projectUsers={project.users}
                fetchProject={fetchProject}
                updateLocalProjectNotes={updateLocalProjectNotes}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />
    </Fragment>
  );
};

Notes.propTypes = propTypes;

export default Notes;
