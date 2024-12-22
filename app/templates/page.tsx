'use client';
import { Header } from "../layouts/public/header";
import { Form, useForm } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PublicLayout from "../layouts/public";
import * as React from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { FaRegFilePdf } from "react-icons/fa6";
import { TbFileTypeDocx } from "react-icons/tb";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import templatesData from "../data/templates.json";
import mammoth from "mammoth";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge"

const categories = Array.from(new Set(templatesData.templates.map(name => name.category))).sort();
const documents = [
  { id: 1, name: "Document 1", file: "/documents/PRLab.pdf", category: "PDF" },
  { id: 2, name: "Document 2", file: "/documents/doc2.docx", category: "Word" },
  { id: 3, name: "Document 3", file: "/documents/doc3.pdf", category: "PDF" },
  { id: 4, name: "Document 4", file: "/documents/doc4.docx", category: "Word" },
];

export default function TemplatePage() {
  const [selectedTerm, setSelectedTerm] = useState(templatesData.templates[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [docxContent, setDocxContent] = useState(""); // State for DOCX content

  const filteredTemplates = templatesData.templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
    const groupedTemplates = filteredTemplates.reduce((acc: { [key: string]: typeof templatesData.templates }, template) => {
      const firstLetter = template.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(template);
      return acc;
    }, {});
  
    const sortedLetters = Object.keys(groupedTemplates).sort();
  
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

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

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
  
    return filteredTemplates.map((doc) => (
      <Dialog key={doc.id}>
        <DialogTrigger asChild>
          <div
            className={`border rounded-lg p-4 bg-gray-100 hover:shadow-lg transition-shadow cursor-pointer ${
              viewMode === "grid" ? "grid grid-cols-1 gap-4" : ""
            }`}
            onClick={() => {
                setSelectedDocument(doc);
                if (doc.file.endsWith(".docx")) handleDocxPreview(doc.file);
              }}
            >
          <h3 className="text-center text-sm font-bold text-gray-800 flex items-center justify-center">
            {doc.name}
          </h3>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Badge className="inline-flex items-center justify-center text-xs font-bold px-2 py-1 rounded-full">
              {doc.category}
            </Badge>
            <Badge
              className={`inline-flex items-center justify-center text-base font-bold px-2 py-1 rounded-full ${
                doc.file.endsWith(".pdf") ? "bg-red-500 text-white" : doc.file.endsWith(".docx") ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {doc.file.endsWith(".pdf") ? <FaRegFilePdf /> : doc.file.endsWith(".docx") ? <TbFileTypeDocx /> : "Unknown"}
            </Badge>
          </div>

      <div className="mt-2">
        {doc.file.endsWith(".pdf") ? (
          <iframe
            src={doc.file}
            title={doc.name}
            className="w-full h-[150px] border rounded-lg"
          ></iframe>
        ) : doc.file.endsWith(".docx") ? (
          <div
            className="w-full h-[150px] overflow-hidden border rounded-lg p-2 bg-gray-50"
            dangerouslySetInnerHTML={{ __html: docxContent }}
          ></div>
        ) : (
          <p className="text-center text-gray-600">
            Preview not available.
          </p>
        )}
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
              width: "87vw",
              height: "500px",
              overflowY: "auto",
              overflowX: "hidden",
              wordWrap: "break-word",
            }}
            dangerouslySetInnerHTML={{ __html: docxContent }}
          ></div>
        ) : (
          <p className="text-center text-gray-600">
            File preview is not supported. Please download the file to view.
          </p>
        )}
      </div>
    </DialogContent>
  )}
</Dialog>

    ));
  };

  return (
    <PublicLayout title="Templates">
      <div className="container py-8">
          <h1 className="mb-6 text-4xl font-bold">Templates</h1>
          <p className="text-lg mb-4 leading-relaxed whitespace-pre-wrap">
            Search for best suitable Templates for your goals.
          </p>
          <div className="grid grid-cols-1 gap-8">
          <div>
            <Card>
              <CardHeader className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search templates..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
            </Card>
          </div>
          <div>
            <div className="border rounded-lg shadow-lg p-6 bg-white">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Documents</h2>
              <div className="grid grid-cols-3 gap-4">
                {renderDocuments()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}