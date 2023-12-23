import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { color, font, mixin } from 'shared/utils/styles';
// import { Avatar } from 'shared/components';

export const NoteLink = styled(Link)`
  display: block;
`;

export const Note = styled.div`
  padding: 10px 8px;
  background: #fff;
  transition: background 0.1s;
  ${mixin.clickable}
  @media (max-width: 1100px) {
    display: block;
  }
  &:hover {
    background: ${color.backgroundLight};
  }
`;

export const Title = styled.p`
  ${font.size(14)}
  margin-bottom: 5px;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// export const Assignees = styled.div`
//   display: flex;
//   flex-direction: row-reverse;
//   margin-left: 2px;
// `;

// export const AssigneeAvatar = styled(Avatar)`
//   margin-left: -2px;
//   box-shadow: 0 0 0 2px #fff;
// `;
