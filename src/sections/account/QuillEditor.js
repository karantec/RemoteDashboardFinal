import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange, id, error, simple }) => {
  const quillRef = useRef(null);
  const [editorHtml, setEditorHtml] = useState(value);

  useEffect(() => {
    if (!simple) {
      const quill = quillRef.current.getEditor();
      quill.on('text-change', () => {
        setEditorHtml(quill.root.innerHTML);
        onChange(quill.root.innerHTML);
      });
    }
  }, [onChange, simple]);

  return (
    <div id={id}>
      <ReactQuill
        ref={quillRef}
        value={editorHtml}
        onChange={setEditorHtml}
        theme={simple ? 'snow' : 'bubble'}
        modules={{
          toolbar: simple ? false : [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        formats={['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image']}
        placeholder={simple ? 'Write your content...' : ''}
        readOnly={simple}
      />
      {error && <p style={{ color: 'red', margin: '5px 0' }}>Error: Invalid content</p>}
    </div>
  );
};

QuillEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  error: PropTypes.bool,
  simple: PropTypes.bool,
};

export default QuillEditor;
