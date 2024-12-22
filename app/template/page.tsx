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
            <h3 className="text-center text-sm font-medium text-gray-800 flex items-center justify-center">
              {doc.name}
            </h3>
            <div
              className={`text-center text-xs font-medium p-1 rounded-full inline-block ${getCategoryClass(
                doc.category
              )}`}
            >
              {doc.category}
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
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
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
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardHeader>
                {/* <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {sortedLetters.map((letter) => (
                      <div key={letter} className="mb-6">
                        <h2 className="mb-2 text-lg font-semibold text-muted-foreground">{letter}</h2>
                        <div className="space-y-1">
                          {groupedTemplates[letter].map((template) => (
                            <button
                              key={template.name}
                              onClick={() => setSelectedTerm(template)}
                              className={`w-full rounded-lg px-3 py-2 text-left hover:bg-accent ${
                                selectedTerm?.name === template.name ? 'bg-accent' : ''
                              }`}
                            >
                              <div className="font-medium">{template.name}</div>
                              <div className="text-sm text-muted-foreground">{template.category}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent> */}
              </Card>
            </div>
  
            <div className="lg:col-span-2">
              <div className="border rounded-lg shadow-lg p-6 bg-white">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Documents</h2>
                <div className={viewMode === "grid" ? "grid grid-cols-2 gap-4" : ""}>
                  {renderDocuments()}
                </div>
              </div>

              {/* <Card className="h-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">{selectedTerm?.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">{selectedTerm?.category}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed whitespace-pre-wrap text-justify">{selectedTerm?.description}</p>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>

      {/* <div>
      
      <main className="container my-10 flex flex-col items-center justify-center">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-6 max-w-[800px] text-5xl font-bold">
              Welcome to the template page
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 w-full">
          <div className="flex items-center justify-center">

          <div className="flex w-full max-w-sm items-center space-x-2">
            <div className="flex flex-direction-col space-x-2">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input placeholder="Search..." />
                <Button type="submit">Search</Button>
              </div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value
                      ? frameworks.find((framework) => framework.value === value)?.label
                      : "Select category..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue)
                              setOpen(false)
                            }}
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === framework.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>  
            </div>
          </div>

          </div>
          <div className="flex items-center justify-center">
            Cards
          </div>
        </div>
      </main>
    </div> */}
    </PublicLayout>
  );
}
