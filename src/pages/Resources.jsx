import { useEffect, useState } from "react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Filter,
  Download,
  BookOpen,
  Video,
  CheckCircle,
  Loader,
  Calendar,
  FileText,
} from "lucide-react";
import { getAllResources } from "../api/apis/resource";
import Button from "../components/ui/common/Button";
import Input from "../components/ui/common/Input";
import Image from "../components/ui/common/Image"
import SEO from "../components/SEO";


const baseCategories = ["All", "Article", "Video", "Image"];

const staticSampleReports = [
  {
    title: "CRD Report Format",
    description:
      "Sample format of a Component Resolved Diagnostics (CRD) report as issued by EA Labs.",
    fileUrl: "/downloads/CRD-Report-Format.pdf",
  },
  {
    title: "Food Intolerance Sample Report",
    description:
      "Sample Food Intolerance test report as issued by EA Labs.",
    fileUrl: "/downloads/Food-Intolerance-Sample-Report.pdf",
  },
];



const typeIcons = {
  Article: BookOpen,
  Video: Video,
  Image: FileText,
};

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: getAllResources,
  });

  const categories = baseCategories.filter((cat) => {
    if (cat === "All") return true;

    return resources.some((r) => {
      if (!r.isPublished) return false;

      if ((r.type === "Image" || r.type === "Video") && !r.fileUrl) {
        return false;
      }

      return r.type === cat;
    });
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading resources...
      </div>
    );
  }


  const filtered = resources
    .filter((r) => r.isPublished)
    .filter((r) => {
      const matchesCategory =
        activeCategory === "All" ||
        r.type.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });


  const handleViewFile = (fileUrl) => {
    if (!fileUrl) return;

    const fullUrl = `${import.meta.env.VITE_BACK_URL}${fileUrl}`;

    // Open file in new tab (PDF/Image/Video)
    window.open(fullUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = (fileUrl) => {
    const filename = fileUrl.split("/").pop();
    const url = `${import.meta.env.VITE_BACK_URL}/api/force-download/${filename}`;
    window.location.href = url;
  };




  return (
    <>
      <SEO pageKey="Resources" />
      <section className="bg-white container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen relative">

        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed top-6 left-6 bg-green-600 text-white py-3 rounded-lg flex items-center gap-2 shadow-lg z-50"
            >
              <CheckCircle className="w-5 h-5" />
              <span>File downloaded successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedResource && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/85"
              onClick={() => !isDownloading && setSelectedResource(null)}
            >

              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                  <h2 className="text-xl font-bold text-gray-900">Resource Details</h2>
                  <Button
                    onClick={() => !isDownloading && setSelectedResource(null)}
                    disabled={isDownloading}
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </Button>
                </div>

                <div className="p-6">
                  <div className="relative md:w-full h-full rounded-xl overflow-hidden bg-gray-100 mb-6">
                    <Image
                      src={
                        selectedResource.thumbnail
                          ? `${import.meta.env.VITE_BACK_URL}${selectedResource.thumbnail}`
                          : "/placeholder.png"
                      }
                      alt={selectedResource.title}
                      className="w-full h-full"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-md">
                      {typeIcons[selectedResource.type] && (
                        React.createElement(typeIcons[selectedResource.type], {
                          className: "w-4 h-4 text-blue-600"
                        })
                      )}
                      <span className="lg:text-xs text-sm md:text-md font-semibold text-gray-700 uppercase">
                        {selectedResource.type}
                      </span>
                    </div>
                  </div>

                  <h3 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-900 mb-4">
                    {selectedResource.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(selectedResource.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{selectedResource.type}</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                      {selectedResource.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => handleDownload(selectedResource.fileUrl, selectedResource.title)}
                      disabled={isDownloading}
                      className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDownloading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          Download File
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={() => handleViewFile(selectedResource.fileUrl)}
                      className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
                    >
                      <BookOpen className="w-5 h-5" />
                      View File
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center pt-10 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=""
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
            >
              Knowledge Hub
            </motion.div>
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4 text-gray-900">
              EA Labs Resource Center
            </h1>
            <p className="lg:text-lg md:text-[16px] text-sm text-gray-600 max-w-2xl mx-auto mb-8">
              At EA Labs, we are dedicated to providing businesses with reliable
              and accurate diagnostic testing services that support health and
              well-being. As a trusted partner for over 30 years, we offer a range
              of testing solutions to meet the needs of healthcare providers, corporate
              wellness programs, and other B2B clients.
            </p>

            <div className="mb-8">
              <div className="relative md:max-w-2xl md:mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-lg text-gray-900 text-sm md:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {searchQuery && (
                  <Button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>

            <div className="w-full mt-6">
              <div
                className="
      flex gap-3 
      overflow-x-auto 
      no-scrollbar
      py-3
      justify-start
      sm:justify-center
    "
              >
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`cursor-pointer px-5 py-2 text-sm whitespace-nowrap rounded-full border transition font-semibold ${activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"
                      }`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

        <div className="container mx-auto pt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Sample Reports
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {staticSampleReports.map((report) => (
              <div
                key={report.fileUrl}
                className="group bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-xl transition-all duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {report.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {report.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={report.fileUrl}
                      download
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                    >
                      <BookOpen className="w-4 h-4" />
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto pt-4">
          <p className="text-gray-700 text-sm md:text-base">
            Showing{" "}
            <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "resource" : "resources"}
          </p>
        </div>

        <div className="container mx-auto py-10">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-10 h-10 mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  No resources found
                </h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {filtered.map((res, i) => {
                  const Icon = typeIcons[res.type];
                  return (
                    <motion.div
                      key={res._id}
                      layout
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative"
                    >

                      <div className="aspect-video overflow-hidden bg-gray-100">
                        <Image
                          src={

                            res.thumbnail

                              ? `${import.meta.env.VITE_BACK_URL}${res.thumbnail}`

                              : "/placeholder.png"

                          }
                          alt={res.title}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full absolute top-4 right-4 z-10 shadow-sm">
                        {Icon && <Icon className="w-3 h-3" />}
                        {res.type}
                      </div>

                      <div className="p-5 flex flex-col grow">
                        <h3 className="text-xl font-extrabold text-gray-900 line-clamp-2 mb-2">
                          {res.title}
                        </h3>

                        <div className="text-xs text-gray-400 mb-3">
                          Posted:{" "}
                          {new Date(res.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 grow">
                          {res.description}
                        </p>

                        <Button
                          onClick={() => setSelectedResource(res)}
                          className="cursor-pointer mt-4 inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                        >
                          View Resource →
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}