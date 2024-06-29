import ReactMarkdown from 'react-markdown';
import { getPostData, getPostSlugs } from '@/utils/posts';
import { notFound } from 'next/navigation';

interface PostProps {
  params: {
    slug: string;
  };
}

const Post: React.FC<PostProps> = ({ params }) => {
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
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

/**
 * Используется для генерации статических параметров (в нашем случае, параметров маршрутов) для страниц Next.js при сборке как в SSG.
 */
export async function generateStaticParams() {
  const filenames = getPostSlugs();

  // Это нужно, чтобы получить чистое имя файла без расширения, которое будет использоваться как параметр маршрута (slug).
  const paths = filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));

  return paths;
}

export default Post;
