import styled from 'styled-components';

import { color, font } from 'shared/utils/styles';

export const EditorCont = styled.div`
  .ql-snow {
    background: ${color.backgroundLightest};
  }
  .ql-toolbar.ql-snow {
    // border-radius: 4px 4px 0 0;
    border: none;
    border-bottom: 1px solid #fff;
  }
  .ql-container.ql-snow {
    // border-radius: 0 0 4px 4px;
    border: 1px solid ${color.borderLightest};
    border-top: none;
    color: ${color.textDarkest};
    ${font.size(14)}
    ${font.regular}
  }
  .ql-editor {
    min-height: 110px;
    border: 1px solid transparent;
    &:hover {
      background: ${color.backgroundLight};
    }
    &:focus {
      background: #fff;
      border: 1px solid ${color.borderInputFocus};
      box-shadow: 0 0 0 1px ${color.borderInputFocus};
    }
  }
`;
