import ReactMarkdown from 'react-markdown';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface PostProps {
  params: {
    slug: string;
  };
}

const getPostData = (slug: string) => {
  const postsDirectory = path.join(process.cwd(), 'content', 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  return { content, frontMatter: data };
};

const Post: React.FC<PostProps> = ({ params }) => {
  const { content, frontMatter } = getPostData(params.slug);

  return (
    <div className="prose mx-auto">
      <h1>{frontMatter.title}</h1>
      <p>{frontMatter.date}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content', 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));

  return paths;
}

export default Post;
