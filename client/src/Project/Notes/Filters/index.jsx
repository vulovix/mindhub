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
        Recently Updated
      </StyledButton>

      {!areFiltersCleared && (
        <ClearAll onClick={() => mergeFilters(defaultFilters)}>Clear Filters</ClearAll>
      )}
    </Filters>
  );
};

ProjectBoardFilters.propTypes = propTypes;

export default ProjectBoardFilters;
