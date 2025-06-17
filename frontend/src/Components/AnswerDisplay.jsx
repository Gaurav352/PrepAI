import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // or any other theme you like

const AnswerDisplay = ({ answer }) => {
  return (
    <div className="prose prose-invert max-w-none text-slate-200">
      <ReactMarkdown
        children={answer}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      />
    </div>
  );
};
export default AnswerDisplay;