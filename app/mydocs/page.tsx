"use client";

import { useState } from "react";
import { LayoutGrid, List as ListIcon } from "lucide-react"; // Lucide icons
import PublicLayout from "../layouts/public"; // Adjust based on your project structure

export default function DocumentFilter() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const documents = [
    { id: 1, name: "Document 1", image: "/images/doc1.png", category: "PDF" },
    { id: 2, name: "Document 2", image: "/images/doc2.png", category: "Image" },
    { id: 3, name: "Document 3", image: "/images/doc3.png", category: "PDF" },
    { id: 4, name: "Document 4", image: "/images/doc4.png", category: "Text" },
    { id: 5, name: "Document 5", image: "/images/doc5.png", category: "Image" },
  ];

  // Filter documents based on search and category
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderDocuments = () => {
    const getCategoryClass = (category) => {
      switch (category) {
        case "PDF":
          return "bg-blue-100 text-blue-800";
        case "Image":
          return "bg-green-100 text-green-800";
        case "Text":
          return "bg-yellow-100 text-yellow-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
  
    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-lg p-4 bg-gray-100 hover:shadow-lg transition-shadow"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="h-32 w-32 mx-auto object-cover rounded-md"
              />
              <h3 className="mt-2 text-center text-sm font-medium text-gray-800">
                {doc.name}
              </h3>
              <div
                className={`text-center text-xs font-medium p-1 rounded-full inline-block ${getCategoryClass(doc.category)}`}
              >
                {doc.category}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (viewMode === "list") {
      return (
        <ul className="list-none space-y-4">
          {filteredDocuments.map((doc) => (
            <li
              key={doc.id}
              className="flex flex-col border rounded-lg p-4 bg-gray-100 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-800">{doc.name}</h3>
              <div
                className={`mt-2 text-xs font-medium p-1 rounded-full inline-block ${getCategoryClass(doc.category)}`}
              >
                {doc.category}
              </div>
            </li>
          ))}
        </ul>
      );
    }
  };
  
  
  

  return (
    <PublicLayout title="Document Viewer">
      <div className="p-4 space-y-4">
        {/* Filters */}
        <div className="flex items-center justify-between space-x-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="PDF">PDF</option>
            <option value="Image">Image</option>
            <option value="Text">Text</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Single Card for Documents */}
        <div className="border rounded-lg shadow-lg p-6 bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Documents
          </h2>
          {renderDocuments()}
        </div>
      </div>
    </PublicLayout>
  );
}
