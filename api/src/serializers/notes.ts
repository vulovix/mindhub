import pick from 'lodash/pick';

import { Note } from 'entities';

export const notePartial = (note: Note): Partial<Note> =>
  pick(note, ['id', 'title', 'createdAt', 'updatedAt', 'userIds']);
