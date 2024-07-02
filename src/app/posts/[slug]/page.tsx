import ReactMarkdown from 'react-markdown';
import { getPostData, getPostFileNames } from '@/utils/posts';
import { notFound } from 'next/navigation';

import rehypeRaw from 'rehype-raw';
import CustomHeading from '@/app/posts/CustomHeading';

interface PostProps {
  params: {
    slug: string;
  };
}

function Post({ params }: PostProps) {
  const postData = getPostData(params.slug);

  if (!postData) {
    notFound();
    return null;
  }

  const { content, frontMatter } = postData;
  return (
    <div className="prose mx-auto">
      <h1>{frontMatter.title}</h1>
      <p>{frontMatter.date}</p>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: CustomHeading, //  Property 'children' is optional in type 'ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps' but required in type 'CustomHeadingProps'
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/**
 * Используется для генерации статических параметров (в нашем случае, параметров маршрутов) для страниц Next.js при сборке как в SSG.
 */
export async function generateStaticParams() {
  const filenames = getPostFileNames();

  // Это нужно, чтобы получить чистое имя файла без расширения, которое будет использоваться как параметр маршрута (slug).
  const paths = filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));

  console.log(paths);
  return paths;
}

export default Post;
