import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import { EditorCont } from './Styles';

const propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  getEditor: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  placeholder: undefined,
  defaultValue: undefined,
  value: undefined,
  onChange: () => {},
  getEditor: () => {},
};

const TextEditor = ({
  className,
  placeholder,
  defaultValue,
  // we're not really feeding new value to quill instance on each render because it's too
  // expensive, but we're still accepting 'value' prop as alias for defaultValue because
  // other components like <Form.Field> feed their children with data via the 'value' prop
  value: alsoDefaultValue,
  onChange,
  getEditor,
}) => {
  const $editorContRef = useRef();
  const $editorRef = useRef();

  const initialValueRef = useRef(defaultValue || alsoDefaultValue || '');

  const quillConfig = {
    theme: 'snow',
    modules: {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'code'],
          [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
          [('blockquote', 'code-block')],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image', 'video'],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
      },
    },
  };

  useLayoutEffect(() => {
    let quill = new Quill($editorRef.current, { placeholder, ...quillConfig });
    quill.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
      const regex = /https?:\/\/[^\s]+/g;
      if (typeof node.data !== 'string') return;
      const matches = node.data.match(regex);

      if (matches && matches.length > 0) {
        const ops = [];
        let str = node.data;

        matches.forEach(match => {
          const split = str.split(match);
          if (match.match(/\.(png|jpg|jpeg|jpg|gif|svg|webp)$/) != null) {
            const beforeLink = split.shift();
            ops.push({ insert: beforeLink });
            ops.push({ insert: { image: match }, attributes: { link: match } });

            str = split.join(match);
          } else {
            const beforeLink = split.shift();
            ops.push({ insert: beforeLink });
            ops.push({ insert: match, attributes: { link: match } });
            str = split.join(match);
          }
        });
        ops.push({ insert: str });
        delta.ops = ops;
      }
      return delta;
    });
    const insertInitialValue = () => {
      quill.clipboard.dangerouslyPasteHTML(0, initialValueRef.current);
      quill.blur();
    };

    const handleContentsChange = () => {
      onChange(getHTMLValue());
    };
    const getHTMLValue = () => $editorContRef.current.querySelector('.ql-editor').innerHTML;

    insertInitialValue();
    getEditor({ getValue: getHTMLValue });

    quill.on('text-change', handleContentsChange);
    return () => {
      quill.off('text-change', handleContentsChange);
      quill = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorCont className={className} ref={$editorContRef}>
      <div ref={$editorRef} />
    </EditorCont>
  );
};

TextEditor.propTypes = propTypes;
TextEditor.defaultProps = defaultProps;

export default TextEditor;
