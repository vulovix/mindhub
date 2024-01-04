import React from 'react';
import PropTypes from 'prop-types';

import { Filters, SearchInput, StyledButton, ClearAll } from './Styles';

const propTypes = {
  defaultFilters: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  mergeFilters: PropTypes.func.isRequired,
};

const ProjectBoardFilters = ({ defaultFilters, filters, mergeFilters }) => {
  const { searchTerm, recent } = filters;

  const areFiltersCleared = !searchTerm && !recent;

  return (
    <Filters data-testid="board-filters">
      <SearchInput
        icon="search"
        value={searchTerm}
        onChange={value => mergeFilters({ searchTerm: value })}
      />
      <StyledButton
        variant="empty"
        isActive={recent}
        onClick={() => mergeFilters({ recent: !recent })}
      >
        Recently updated
      </StyledButton>
      {!areFiltersCleared && (
        <ClearAll variant="empty" onClick={() => mergeFilters(defaultFilters)}>
          Clear all
        </ClearAll>
      )}
    </Filters>
  );
};

ProjectBoardFilters.propTypes = propTypes;

export default ProjectBoardFilters;
