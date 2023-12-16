import { Project } from 'entities';
import { catchErrors } from 'errors';
import { findEntityOrThrow, updateEntity } from 'utils/typeorm';
import { issuePartial } from 'serializers/issues';
import { notePartial } from 'serializers/notes';

export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {
  const project = await findEntityOrThrow(Project, {
    where: {
      id: req.currentUser.projectId,
    },
    relations: ['users', 'issues', 'notes'],
  });
  res.respond({
    project: {
      ...project,
      issues: project.issues.map(issuePartial),
      notes: project.notes.map(notePartial),
    },
  });
});

export const update = catchErrors(async (req, res) => {
  const project = await updateEntity(Project, req.currentUser.projectId, req.body);
  res.respond({ project });
});
