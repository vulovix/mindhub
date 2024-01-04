import React from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import ArtificialIntelligence from 'ArtificialIntelligence';
import { updateArrayItemById } from 'shared/utils/javascript';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { PageLoader, PageError, Modal } from 'shared/components';

import NavbarLeft from './NavbarLeft';
import Sidebar from './Sidebar';
import Board from './Board';
import IssueSearch from './IssueSearch';
import NoteSearch from './NoteSearch';
import IssueCreate from './IssueCreate';
import NoteCreate from './NoteCreate';
import ProjectSettings from './ProjectSettings';
import { ProjectPage } from './Styles';
import Notes from './Notes';

const Project = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const issueSearchModalHelpers = createQueryParamModalHelpers('issue-search');
  const noteSearchModalHelpers = createQueryParamModalHelpers('note-search');
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');
  const noteCreateModalHelpers = createQueryParamModalHelpers('note-create');

  const [{ data, error, setLocalData }, fetchProject] = useApi.get('/project');

  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const { project } = data;

  const handleNavigate = path => history.push(path);

  const updateLocalProjectIssues = (issueId, updatedFields) => {
    setLocalData(currentData => ({
      project: {
        ...currentData.project,
        issues: updateArrayItemById(currentData.project.issues, issueId, updatedFields),
      },
    }));
  };

  const updateLocalProjectNotes = (noteId, updatedFields) => {
    setLocalData(currentData => {
      console.log(currentData, noteId, updatedFields);
      return {
        project: {
          ...currentData.project,
          notes: updateArrayItemById(currentData.project.notes, noteId, updatedFields),
        },
      };
    });
  };

  return (
    <ProjectPage>
      <NavbarLeft
        issueSearchModalOpen={issueSearchModalHelpers.open}
        noteSearchModalOpen={noteSearchModalHelpers.open}
        issueCreateModalOpen={issueCreateModalHelpers.open}
        noteCreateModalOpen={noteCreateModalHelpers.open}
        onNavigate={handleNavigate}
      />

      <Sidebar project={project} />

      {issueSearchModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:issue-search"
          variant="aside"
          width={600}
          onClose={issueSearchModalHelpers.close}
          renderContent={() => <IssueSearch project={project} />}
        />
      )}

      {noteSearchModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:note-search"
          variant="aside"
          width={600}
          onClose={noteSearchModalHelpers.close}
          renderContent={() => <NoteSearch project={project} />}
        />
      )}

      {issueCreateModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:issue-create"
          width={800}
          withCloseIcon={false}
          onClose={issueCreateModalHelpers.close}
          renderContent={modal => (
            <IssueCreate
              project={project}
              fetchProject={fetchProject}
              onCreate={() => history.push(`${match.url}/board`)}
              modalClose={modal.close}
            />
          )}
        />
      )}

      {noteCreateModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:note-create"
          width={800}
          withCloseIcon={false}
          onClose={noteCreateModalHelpers.close}
          renderContent={modal => (
            <NoteCreate
              project={project}
              fetchProject={fetchProject}
              onCreate={() => history.push(`${match.url}/notes`)}
              modalClose={modal.close}
            />
          )}
        />
      )}

      <Route
        path={`${match.path}/board`}
        render={() => (
          <Board
            project={project}
            fetchProject={fetchProject}
            updateLocalProjectIssues={updateLocalProjectIssues}
          />
        )}
      />

      <Route
        path={`${match.path}/notes`}
        render={() => (
          <Notes
            project={project}
            fetchProject={fetchProject}
            updateLocalProjectNotes={updateLocalProjectNotes}
          />
        )}
      />

      <Route path={`${match.path}/intelligence`} render={() => <ArtificialIntelligence />} />

      <Route
        path={`${match.path}/preferences`}
        render={() => <ProjectSettings project={project} fetchProject={fetchProject} />}
      />

      {match.isExact && <Redirect to={`${match.url}/board`} />}
    </ProjectPage>
  );
};

export default Project;
