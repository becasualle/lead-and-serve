import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

/**
 * process.cwd() возвращает текущую рабочую директорию (обычно корневую директорию проекта).
 * path.join(process.cwd(), 'content', 'posts') создает путь к директории, где хранятся файлы Markdown (content/posts).
 * Это делается с помощью метода join из модуля path, чтобы создать кроссплатформенный путь
 * (работающий и на Windows, и на Unix-подобных системах).
 */
const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export const getPostFileNames = () => {
  /**
   * fs.readdirSync(postsDirectory) читает содержимое директории postsDirectory и возвращает массив имен файлов в этой директории.
   * Это синхронный метод из модуля fs (файловой системы) Node.js. В результате filenames будет массивом, содержащим имена
   * всех файлов в директории content/posts.
   */
  return fs.readdirSync(postsDirectory);
};

export const getPostData = (slug: string) => {
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  return { content, frontMatter: data };
};
