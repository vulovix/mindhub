import styled from 'styled-components';

import { color, font } from 'shared/utils/styles';

export const Dates = styled.div`
  /* padding-top: 13px; */
  display: flex;
  line-height: 22px;
  border-top: 1px solid ${color.borderLightest};
  color: ${color.textMedium};
  ${font.size(13)}
`;
