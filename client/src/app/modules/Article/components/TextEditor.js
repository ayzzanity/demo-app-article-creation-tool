import { inject, observer } from 'mobx-react';
import { ArticleController } from '../controller';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ store }) => {
  const { handleArticleContent } = ArticleController({ store });
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['clean']
    ]
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'script',
    'color',
    'background',
    'list',
    'indent',
    'link'
  ];
  return (
    <ReactQuill
      theme="snow"
      placeholder={'Write something...'}
      value={store.articles.singleState.content}
      onChange={(content) => handleArticleContent(content)}
      modules={modules}
      formats={formats}
    />
  );
};

export default inject('store')(observer(TextEditor));
