interface PostLayoutProps {
  children: React.ReactNode;
}

function PostLayout({ children }: PostLayoutProps) {
  return <div className="container mx-auto my-8 px-4">{children}</div>;
}

export default PostLayout;
