import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import useApi from 'shared/hooks/api';
import { sortByNewest } from 'shared/utils/javascript';

import NoResultsSVG from './NoResultsSvg';
import {
  NoteSearch,
  SearchInputCont,
  SearchInputDebounced,
  SearchIcon,
  SearchSpinner,
  Note,
  NoteData,
  NoteTitle,
  SectionTitle,
  NoResults,
  NoResultsTitle,
  NoResultsTip,
} from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
};

const ProjectNoteSearch = ({ project }) => {
  const [isSearchTermEmpty, setIsSearchTermEmpty] = useState(true);

  const [{ data, isLoading }, fetchNotes] = useApi.get('/notes', {}, { lazy: true });

  const matchingIssues = get(data, 'notes', []);

  const recentNotes = sortByNewest(project.notes, 'createdAt').slice(0, 10);

  const handleSearchChange = value => {
    const searchTerm = value.trim();

    setIsSearchTermEmpty(!searchTerm);

    if (searchTerm) {
      fetchNotes({ searchTerm });
    }
  };

  return (
    <NoteSearch>
      <SearchInputCont>
        <SearchInputDebounced
          autoFocus
          placeholder="Search notes by summary, description..."
          onChange={handleSearchChange}
        />
        <SearchIcon type="search" size={22} />
        {isLoading && <SearchSpinner />}
      </SearchInputCont>

      {isSearchTermEmpty && recentNotes.length > 0 && (
        <Fragment>
          <SectionTitle>Recent Notes</SectionTitle>
          {recentNotes.map(renderNote)}
        </Fragment>
      )}

      {!isSearchTermEmpty && matchingIssues.length > 0 && (
        <Fragment>
          <SectionTitle>Matching Notes</SectionTitle>
          {matchingIssues.map(renderNote)}
        </Fragment>
      )}

      {!isSearchTermEmpty && !isLoading && matchingIssues.length === 0 && (
        <NoResults>
          <NoResultsSVG />
          <NoResultsTitle>We couldn&apos;t find anything matching your search</NoResultsTitle>
          <NoResultsTip>Try again with a different term.</NoResultsTip>
        </NoResults>
      )}
    </NoteSearch>
  );
};

const renderNote = note => (
  <Link key={note.id} to={`/workspace/notes/notes/${note.id}`}>
    <Note>
      <NoteData>
        <NoteTitle>{note.title}</NoteTitle>
      </NoteData>
    </Note>
  </Link>
);

ProjectNoteSearch.propTypes = propTypes;

export default ProjectNoteSearch;
