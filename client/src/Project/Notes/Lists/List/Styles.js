import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';

export const List = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0 5px; */
  min-height: 400px;
  width: 100%;
  /* background: ${color.backgroundLightest}; */
`;

export const Title = styled.div`
  padding: 13px 10px 13px;
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.medium};
  margin-bottom: 5px;
  background-color: ${color.backgroundLight};
  ${font.size(12.5)};
  ${mixin.truncateText}
`;

export const NoNotes = styled.div`
  padding: 10px;
  background: #fff;
  transition: background 0.1s;
  ${mixin.clickable}
  @media (max-width: 1100px) {
    padding: 10px 8px;
  }
`;

export const Notes = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  /* gap: 5px; */
  /* padding: 5px; */
`;
