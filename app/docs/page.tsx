'use client'
import { useState } from "react";
import { LayoutGrid, List as ListIcon } from "lucide-react"; // Lucide icons
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PublicLayout from "../layouts/public"; // Adjust based on your project structure
import mammoth from "mammoth"; // Add this to handle DOCX preview

export default function DocumentFilter() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [docxContent, setDocxContent] = useState(""); // State for DOCX content

  const documents = [
    { id: 1, name: "Document 1", file: "/documents/PRLab.pdf", category: "PDF" },
    { id: 2, name: "Document 2", file: "/documents/doc2.docx", category: "Word" },
    { id: 3, name: "Document 3", file: "/documents/doc3.pdf", category: "PDF" },
    { id: 4, name: "Document 4", file: "/documents/doc4.docx", category: "Word" },
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

  // Load DOCX content when a document is selected
  const handleDocxPreview = async (file) => {
    try {
      const response = await fetch(file);
      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setDocxContent(result.value); // Set the extracted DOCX content as HTML
    } catch (error) {
      console.error("Error loading DOCX file:", error);
      setDocxContent("Unable to preview this document.");
    }
  };

  const renderDocuments = () => {
    const getCategoryClass = (category) => {
      switch (category) {
        case "PDF":
          return "bg-blue-100 text-blue-800";
        case "Word":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return filteredDocuments.map((doc) => (
      <Dialog key={doc.id}>
        <DialogTrigger asChild>
          <div
            className={`border rounded-lg p-4 bg-gray-100 hover:shadow-lg transition-shadow cursor-pointer ${
              viewMode === "grid" ? "grid grid-cols-3 gap-4" : ""
            }`}
            onClick={() => {
              setSelectedDocument(doc);
              if (doc.file.endsWith(".docx")) handleDocxPreview(doc.file);
            }}
          >
            <h3 className="mt-2 text-center text-sm font-medium text-gray-800">
              {doc.name}
            </h3>
            <div
              className={`text-center text-xs font-medium p-1 rounded-full inline-block ${getCategoryClass(doc.category)}`}
            >
              {doc.category}
            </div>
          </div>
        </DialogTrigger>
        {selectedDocument && (
          <DialogContent className="bg-white text-gray-800 rounded-lg shadow-lg p-6 max-w-[90vw] max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>{selectedDocument.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {selectedDocument.file.endsWith(".pdf") ? (
                <iframe
                  src={selectedDocument.file}
                  title={selectedDocument.name}
                  className="w-full h-[70vh] border rounded-lg"
                ></iframe>
              ) : selectedDocument.file.endsWith(".docx") ? (
                <div
                  className="w-full h-[70vh] overflow-y-auto overflow-x-hidden border rounded-lg p-4 bg-gray-50"
                  style={{
                    width: "87vw", // Fixed width
                    height: "500px", // Fixed height
                    overflowY: "auto", // Scrollable vertical content
                    overflowX: "hidden", // Prevent horizontal scrolling
                    wordWrap: "break-word", // Ensure text wraps
                  }}
                  dangerouslySetInnerHTML={{ __html: docxContent }}
                ></div>
              ) : (
                <p className="text-center text-gray-600">
                  File preview is not supported. Please download the file to view.
                </p>
              )}
            </div>
            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => console.log("Edit button clicked")} // Replace with actual edit logic
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => console.log("Send button clicked")} // Replace with actual send logic
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Send
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    ));
  };

  return (
    <PublicLayout title="Document Viewer">
      <div className="p-4 space-y-4 max-w-screen-lg mx-auto">
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
            <option value="Word">Word</option>
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

        {/* Documents */}
        <div className="border rounded-lg shadow-lg p-6 bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Documents</h2>
          <div className={viewMode === "grid" ? "grid grid-cols-3 gap-4" : ""}>
            {renderDocuments()}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
