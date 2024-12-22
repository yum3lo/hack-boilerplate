'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface TinyMCEEditorProps {
  initialValue?: string;
  onChange?: (content: string) => void;
  height?: number;
  disabled?: boolean;
}

export function TinyMCEEditor({
  initialValue = '',
  onChange,
  height = 500,
  disabled = false
}: TinyMCEEditorProps) {
  const editorRef = useRef<any>(null);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(evt, editor) => editorRef.current = editor}
      initialValue={initialValue}
      init={{
        height,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        disabled: disabled
      }}
      onEditorChange={(content) => {
        onChange?.(content);
      }}
    />
  );
}