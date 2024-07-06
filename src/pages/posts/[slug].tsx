import { getPostData, getPostFileNames } from '@/utils/posts';

import ReactMarkdown from 'react-markdown';

import rehypeRaw from 'rehype-raw';
import CustomHeading from '@/components/CustomHeading';

interface Params {
  params: {
    slug: string;
  };
}

interface Post {
  content: string;
  frontMatter: {
    [key: string]: any;
  };
}

interface Props {
  postData: Post | null;
}

export async function getStaticPaths() {
  const filenames = getPostFileNames();

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));

  console.error(paths);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: Params) {
  const postData = getPostData(params.slug);
  return { props: { postData } };
}

export default function Post({ postData }: Props) {
  if (!postData) {
    return (
      <div>
        <h1>Post not found</h1>
      </div>
    );
  }

  const { content, frontMatter } = postData;
  return (
    <div className="prose mx-auto">
      <h1>{frontMatter.title}</h1>
      <p>{frontMatter.date}</p>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: CustomHeading,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
