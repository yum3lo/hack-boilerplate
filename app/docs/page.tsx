'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { FileText, LayoutGrid, List as ListIcon, Edit, Send } from "lucide-react";
import { TbFileTypeDocx } from "react-icons/tb";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PublicLayout from "../layouts/public";

interface Document {
  id: number;
  name: string;
  file: string;
  category: string;
  content?: string;
}

export default function DocumentsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [docxContent, setDocxContent] = useState("");

  const documents = [
    { id: 1, name: "Business Registration", file: "/documents/PRLab.pdf", category: "PDF" },
    { id: 2, name: "Tax Declaration", file: "/documents/doc2.docx", category: "Word" },
    { id: 3, name: "Annual Report", file: "/documents/PRLab.pdf", category: "PDF" },
    { id: 4, name: "Employee Contracts", file: "/documents/doc2.docx", category: "Word" },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (doc: Document) => {
    router.push(`/docs/${doc.id}`);
  };

  return (
    <PublicLayout title="Documents">
      <main className="container my-10 flex items-center justify-center">
        <div className="flex items-center justify-between space-x-[10vw]">
          <div>
            <h1 className="mb-6 max-w-[600px] text-4xl font-bold">
              My Documents
            </h1>
            <div className="max-w-[800px]">
              <Card className="w-full">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8" />
                      <div>
                        <CardTitle className="text-2xl">Documents</CardTitle>
                        <CardDescription>View and manage your business documents</CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setViewMode("grid")}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setViewMode("list")}
                      >
                        <ListIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <Input
                      type="text"
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="all">All Types</option>
                      <option value="PDF">PDF</option>
                      <option value="Word">Word</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`grid ${viewMode === "grid" ? "grid-cols-2 gap-4" : "grid-cols-1 gap-2"}`}>
                    {filteredDocuments.map((doc) => (
                      <Dialog key={doc.id}>
                        <DialogTrigger asChild>
                          <div className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-shadow hover:shadow-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {doc.category === "PDF" ? (
                                  <FileText className="h-8 w-8 text-red-500" />
                                ) : (
                                  <TbFileTypeDocx className="h-8 w-8 text-blue-500" />
                                )}
                                <div>
                                  <h3 className="font-semibold">{doc.name}</h3>
                                  <Badge variant="secondary">{doc.category}</Badge>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(doc);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{doc.name}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 aspect-[16/10] w-full overflow-hidden rounded-lg border">
                            {doc.file.endsWith('.pdf') ? (
                              <iframe src={doc.file} className="h-full w-full" />
                            ) : (
                              <div className="h-full w-full p-4">
                                <p>Preview not available for this document type.</p>
                              </div>
                            )}
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => handleEdit(doc)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button>
                              <Send className="mr-2 h-4 w-4" />
                              Send
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}