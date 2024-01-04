import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';
import { InputDebounced, Avatar, Button } from 'shared/components';

export const Filters = styled.div`
  display: flex;
  row-gap: 1rem;
  align-items: center;
  margin-top: 24px;
`;

export const SearchInput = styled(InputDebounced)`
  margin-right: 24px;
  min-width: 100px;
  width: calc(50% - 6px);
`;

export const Avatars = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 0 12px 0 2px;
`;

export const AvatarIsActiveBorder = styled.div`
  display: inline-flex;
  margin-left: -2px;
  border-radius: 50%;
  transition: transform 0.1s;
  ${mixin.clickable};
  ${props => props.isActive && `box-shadow: 0 0 0 4px ${color.primary}`}
  &:hover {
    transform: translateY(-5px);
  }
`;

export const StyledAvatar = styled(Avatar)`
  box-shadow: 0 0 0 2px #fff;
`;

export const StyledButton = styled(Button)`
  margin-left: 6px;
  ${font.size(12)}
  text-wrap: pretty;
  line-height: 1.67;
`;

export const ClearAll = styled(StyledButton)`
  height: 32px;
  margin-left: auto;
  padding-left: 12px;
  color: ${color.textDark};
  ${mixin.clickable}
  &:hover {
    color: ${color.textDark};
  }
`;
