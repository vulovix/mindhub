import { color, font } from 'shared/utils/styles';
import styled from 'styled-components';

export const AuthenticatePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  /* align-items: center; */
  justify-content: center;
  height: calc(100vh - 68px);
  h4 {
    text-align: center;
  }
`;

export const AuthenticatePageControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  & * {
    width: 100%;
  }
`;

export const InputCont = styled.div`
  padding: 0 5px;
  width: 100%;
`;

export const InputLabel = styled.div`
  padding-bottom: 10px;
  margin: 0px 0px 0px 0px;
  color: ${color.textMedium};
  ${font.medium};
  ${font.size(13)};
`;
