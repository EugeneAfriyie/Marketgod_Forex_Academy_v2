import React from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "../../context/ThemeContext";
import { resources } from "../data/data";
import NotFound from "../../Pages/NotFound";

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const post = resources.find((p) => generateSlug(p.title) === slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className={`py-12 md:py-20 ${isDark ? "bg-mg-dark-bg text-mg-paper" : "bg-mg-light-b text-mg-charcoal"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          <header className="mb-8">
            <div className="mb-4">
              <Link to="/blog" className={`text-sm font-semibold hover:underline ${isDark ? "text-mg-gold" : "text-mg-green"}`}>
                &larr; Back to Blog
              </Link>
            </div>
            <h1 className={`text-3xl md:text-5xl font-black leading-tight mb-4
              ${isDark 
                ? "bg-clip-text text-transparent bg-gradient-to-r from-mg-gold via-mg-green to-mg-gold" 
                : "text-mg-charcoal"
              }`}
            >
              {post.title}
            </h1>
            <div className={`flex items-center space-x-4 text-sm ${isDark ? "text-mg-paper/60" : "text-mg-charcoal/60"}`}>
              <span>By {post.author || "Marketgod"}</span>
              <span>&bull;</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>&bull;</span>
              <span className="font-semibold">{post.category}</span>
            </div>
          </header>

          {post.image && (
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full rounded-2xl shadow-lg mb-8 object-cover aspect-video" 
            />
          )}

          <div className={`prose prose-lg max-w-none ${isDark ? "prose-invert" : ""}
            prose-h2:font-black prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            ${isDark ? "prose-h2:text-mg-gold" : "prose-h2:text-mg-charcoal"}
            prose-p:leading-relaxed prose-p:mb-5
            ${isDark ? "prose-p:text-mg-paper/80" : "prose-p:text-mg-charcoal/80"}
            prose-a:text-mg-green prose-a:font-medium hover:prose-a:text-mg-gold prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl
            ${isDark 
              ? "prose-blockquote:border-mg-gold/50 prose-blockquote:text-mg-paper/70 prose-blockquote:bg-mg-charcoal/30" 
              : "prose-blockquote:border-mg-green/50 prose-blockquote:text-mg-charcoal/70 prose-blockquote:bg-gray-50"
            }
          `}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.fullText || post.description}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;


