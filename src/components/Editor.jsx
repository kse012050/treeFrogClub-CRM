import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Font,
  Link,
  Image,
  ImageUpload,
  FileRepository,      // ✅ 추가
  // SimpleUploadAdapter, // ❌ 커스텀 어댑터만 쓸 경우 제거 권장
  Table,
  TableToolbar,
  MediaEmbed,
  List,
  Indent,
  Alignment,
} from 'ckeditor5';

import coreTranslations from 'ckeditor5/translations/ko.js';
import 'ckeditor5/ckeditor5.css';

function Editor({ data, setInputs }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data ? data.replace(/&quot;/g, '').replace(/\\/g, '') : ''}
      onChange={(e, editor) => {
        const html = editor.getData();
        setInputs(prev => ({ ...prev, comment: html }));
      }}
      config={{
        licenseKey: 'GPL',
        plugins: [
          // 순서는 크게 상관 없지만, FileRepository가 포함되어 있어야 함
          Essentials, Paragraph, Heading,
          Bold, Italic, Font, Link,
          Image, ImageUpload, FileRepository,  // ✅ 포함
          Table, TableToolbar, MediaEmbed, List, Indent, Alignment,
          MyCustomUploadAdapterPlugin,         // 커스텀 어댑터 플러그인
        ],
        toolbar: [
          'undo', 'redo',
          'heading',
          'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
          'alignment', '|',
          'bold', 'italic', '|',
          'link', 'uploadImage', '|',
          'insertTable', 'mediaEmbed', '|',
          'bulletedList', 'numberedList', 'outdent', 'indent', '|',
        ],
        translations: [coreTranslations],
        table: { contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'] },
        // fontSize: {
        //   options: [8, 10, 12, 14, 16, 18, 20, 24, 32, 48],
        //   default: 12,           // ✅ 에디터 기본 폰트 크기 (px)
        // },
        // fontFamily: {
        //   options: [
        //       'default',
        //       'Pretendard, Arial, sans-serif',
        //       'Arial, Helvetica, sans-serif',
        //       'Courier New, Courier, monospace',
        //       'Georgia, serif',
        //       'Lucida Sans Unicode, Lucida Grande, sans-serif',
        //       'Tahoma, Geneva, sans-serif',
        //       'Times New Roman, Times, serif',
        //       'Trebuchet MS, Helvetica, sans-serif',
        //       'Verdana, Geneva, sans-serif'
        //   ]
        // },

      }}
    />
  );
}

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(file => {
      const formData = new FormData();
      formData.append('file', file);

      return fetch(`${process.env.REACT_APP_API_URL}/api/web/file`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authorization')}`, // ✅ Header로 전달
          'Service-Key': process.env.REACT_APP_SERVICE_KEY,                   // ✅ Header로 전달
        },
      })
        .then(res => res.json())
        .then(result => {
          return { default: result.data.file_url };
        });
    });
  }

  abort() {}
}


function MyCustomUploadAdapterPlugin(editor) {
  // ✅ FileRepository가 로드되어 있다고 확신할 수 있는 상태여야 함
  const repo = editor.plugins.get('FileRepository'); // 여기서 에러 났던 것
  repo.createUploadAdapter = loader => new MyUploadAdapter(loader);
}

export default Editor;
