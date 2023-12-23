import styled from 'styled-components';

import { color, font } from 'shared/utils/styles';

export const Dates = styled.div`
  /* padding-top: 13px; */
  line-height: 22px;
  display: flex;
  border-top: 1px solid ${color.borderLightest};
  color: ${color.textLight};
  ${font.size(12)}
`;
