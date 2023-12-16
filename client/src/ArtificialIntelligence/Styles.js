import styled from 'styled-components';

import { sizes } from 'shared/utils/styles';
import { Textarea } from 'shared/components';

const paddingLeft = sizes.appNavBarLeftWidth - 34;

export const ArtificialIntelligencePage = styled.div`
  position: relative;
  height: calc(100vh - 115px - 25px - 25px);
  /* max-width: 640px;
  margin: 0 auto; */
  /* padding: 25px 32px 50px ${paddingLeft}px; */

  /* @media (max-width: 1100px) {
    padding: 25px 20px 50px ${paddingLeft - 25}px;
  } */
  /* @media (max-width: 999px) {
    padding-left: ${paddingLeft - sizes.secondarySideBarWidth}px;
  } */
`;

export const Prompt = styled(Textarea)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  textarea {
    height: 115px !important;
    resize: vertical;
  }
`;
