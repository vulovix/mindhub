import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';
import { InputDebounced, Spinner, Icon } from 'shared/components';

export const NoteSearch = styled.div`
  padding: 25px 35px 60px;
`;

export const SearchInputCont = styled.div`
  position: relative;
  padding-right: 30px;
  margin-bottom: 40px;
`;

export const SearchInputDebounced = styled(InputDebounced)`
  height: 40px;
  input {
    padding: 0 0 0 32px;
    border: none;
    border-bottom: 2px solid ${color.primary};
    background: #fff;
    ${font.size(21)}
    &:focus,
    &:hover {
      box-shadow: none;
      border: none;
      border-bottom: 2px solid ${color.primary};
      background: #fff;
    }
  }
`;

export const SearchIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  left: 0;
  color: ${color.textMedium};
`;

export const SearchSpinner = styled(Spinner)`
  position: absolute;
  top: 5px;
  right: 30px;
`;

export const Note = styled.div`
  display: flex;
  align-items: center;
  transition: background 0.1s;
  ${mixin.clickable}
  &:hover {
    background: ${color.backgroundLight};
  }
`;

export const NoteData = styled.div``;

export const NoteTitle = styled.div`
  color: ${color.textDark};
  padding: 10px;
  ${font.size(15)}
`;

export const SectionTitle = styled.div`
  padding-bottom: 12px;
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.bold}
  ${font.size(11.5)}
`;

export const NoResults = styled.div`
  padding-top: 50px;
  text-align: center;
`;

export const NoResultsTitle = styled.div`
  padding-top: 30px;
  ${font.medium}
  ${font.size(20)}
`;

export const NoResultsTip = styled.div`
  padding-top: 10px;
  ${font.size(15)}
`;
