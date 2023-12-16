import styled from 'styled-components';
import { color as colors, font } from 'shared/utils/styles';
import { Avatar } from 'shared/components';

export const ConversationWrapper = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
  overflow: auto;
  flex-direction: column;
`;

export const Icon = styled(Avatar)`
  background-color: transparent;
`;

export const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex: 0;
  align-items: start;
`;

export const Message = styled.div`
  width: 100%;
  ${font.size(14)}
  padding: 0.6rem 0.75rem;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.67;
`;

export const SystemMessage = styled(Message)`
  background-color: ${colors.backgroundLightest};
`;

export const UserMessage = styled(Message)`
  /* background-color: ${colors.backgroundLightest}; */
`;
