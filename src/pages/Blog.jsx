import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "../api/apis/blog";
import Image from "../components/ui/common/Image";
import { useEffect } from "react";
import SEO from "../components/SEO";

const BlogPage = () => {
  const navigate = useNavigate();

  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const createSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleCardClick = (name) => {
    navigate(`/blog/blog-detail/${createSlug(name)}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return <div className="text-center py-20">Error loading blogs</div>;
  }

  return (
    <>
      <SEO pageKey="Blog" />
      <div className="bg-white container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pt-14 pb-6">
          <h1 className="lg:text-4xl sm:text-3xl text-2xl font-bold text-gray-900 text-center">
            Our Blog
          </h1>
        </header>

        <main className="py-8">
          {blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <Image
                    src={`${import.meta.env.VITE_BACK_URL}/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-auto"
                  />

                  <div className="p-6">
                    <h2 className="lg:text-2xl md:text-xl text-lg font-bold text-gray-800 mb-3">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 line-clamp-3 mb-4 text-sm md:text-base">
                      {blog.description}
                    </p>

                    <button
                      onClick={() =>
                        handleCardClick(blog.title)
                      }
                      className="mt-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                    >
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No blogs found</p>
          )}
        </main>
      </div>
    </>
  );
};

export default BlogPage;
