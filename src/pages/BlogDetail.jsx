import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { getBlogByName } from "../api/apis/blog";
import { useEffect } from "react";
import SEO from "../components/SEO";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogByName(slug),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const blog = data;

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (isError || !blog) return <div className="text-center py-20">Blog not found</div>;

  const formatTextWithBold = (text) => {
    if (!text) return null;
    return text.split("**").map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="font-semibold text-gray-900">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  const slugToPageKey = {
    "is-your-body-hiding-allergies-how-in-vitro-testing-reveals-the-truth": "AllergyTesting",
    "ige-and-allergy-testing-how-labs-identify-triggers": "IgEAllergy",
    "flu-or-allergy-how-to-tell-the-difference": "FluAllergy",
    "10-thyroid-symptoms-in-women-you-shouldnt-ignore": "ThyroidWomen",
  };
  const seoPageKey = slugToPageKey[slug] || null;


  return (
    <>
      <SEO pageKey={seoPageKey} />
      <div className="container mx-auto px-4 py-10 max-w-4xl">

        <button
          onClick={() => navigate("/blog")}
          className="cursor-pointer flex items-center gap-2 mb-6 font-semibold hover:text-blue-800 text-sm md:text-base"
        >
          <ArrowLeft size={18} /> Back to Blog
        </button>

        <img
          src={`${import.meta.env.VITE_BACK_URL}/${blog.image}`}
          alt={blog.title}
          className="w-full h-auto rounded-xl mb-6"
        />

        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
          {blog.title}
        </h1>

        <div className="flex gap-6 text-gray-500 text-sm mb-6">
          {blog.author && (
            <span className="flex items-center gap-1">
              <User size={16} /> {blog.author}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>

        <p className="text-sm md:text-base whitespace-pre-line">
          {formatTextWithBold(blog.description)}
        </p>
      </div>
    </>
  );
};

export default BlogDetail;
