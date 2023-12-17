import { Note } from 'entities';
import { catchErrors } from 'errors';
import { updateEntity, deleteEntity, createEntity, findEntityOrThrow } from 'utils/typeorm';

export const getProjectNotes = catchErrors(async (req, res) => {
  const { projectId } = req.currentUser;
  const { searchTerm } = req.query;

  let whereSQL = 'note.projectId = :projectId';

  if (searchTerm) {
    whereSQL += ' AND (note.title ILIKE :searchTerm OR note.descriptionText ILIKE :searchTerm)';
  }

  const notes = await Note.createQueryBuilder('note')
    .select()
    .where(whereSQL, { projectId, searchTerm: `%${searchTerm}%` })
    .getMany();

  res.respond({ notes });
});

export const getNote = catchErrors(async (req, res) => {
  const note = await findEntityOrThrow(Note, {
    where: { id: req.params.noteId },
  });
  res.respond({ note });
});

export const create = catchErrors(async (req, res) => {
  const note = await createEntity(Note, { ...req.body });
  res.respond({ note });
});

export const update = catchErrors(async (req, res) => {
  const note = await updateEntity(Note, req.params.noteId, req.body);
  res.respond({ note });
});

export const remove = catchErrors(async (req, res) => {
  const note = await deleteEntity(Note, req.params.noteId);
  res.respond({ note });
});
