'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Editor } from '@tinymce/tinymce-react';
import { useToast } from '@/hooks/use-toast';
import PublicLayout from "../../layouts/public";
import mammoth from 'mammoth';

interface DocumentData {
  id: number;
  name: string;
  file: string;
  category: string;
  content?: string;
}

const documents = [
  { id: 1, name: "Business Registration", file: "/documents/PRLab.pdf", category: "PDF" },
  { id: 2, name: "Tax Declaration", file: "/documents/doc2.docx", category: "Word" },
  { id: 3, name: "Annual Report", file: "/documents/PRLab.pdf", category: "PDF" },
  { id: 4, name: "Employee Contracts", file: "/documents/doc2.docx", category: "Word" },
];

export default function EditDocumentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef<any>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const loadDocument = async () => {
      const doc = documents.find(d => d.id === parseInt(params.id));
      if (!doc) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Document not found"
        });
        router.push('/docs');
        return;
      }

      setDocument(doc);

      try {
        if (doc.category === "Word") {
          const response = await fetch(doc.file);
          const arrayBuffer = await response.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });
          setEditorContent(result.value);
        }
      } catch (error) {
        console.error('Error loading document:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load document content"
        });
      }
    };

    loadDocument();
  }, [params.id, router, toast]);

  const handleEditorChange = (content: string) => {
    // Only update content if it's actually different
    if (content !== editorContent) {
      setEditorContent(content);
    }
  };

  const handleSave = async () => {
    if (!document) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "Document saved successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save document"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!document) return null;

  return (
    <PublicLayout title="Edit Document">
      <main className="container my-10 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">Edit Document</h1>
        <div className="flex items-center justify-between mb-6">
            <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
            >
            <ArrowLeft className="h-4 w-4" />
            Back to Documents
            </Button>
            <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2"
            >
            <Save className="h-4 w-4" />
            {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">{document.name}</CardTitle>
              <CardDescription>
                {document.category === "PDF" 
                  ? "PDF documents can be viewed in the preview below" 
                  : "Make changes to your document"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {document.category === "PDF" ? (
                <div className="rounded-lg border h-[600px]">
                  <iframe 
                    src={document.file} 
                    className="w-full h-full rounded-lg"
                    title={document.name}
                  />
                </div>
              ) : (
                <div className="rounded-lg border">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    onInit={(evt, editor) => {
                      editorRef.current = editor;
                    }}
                    value={editorContent}
                    onEditorChange={handleEditorChange}
                    init={{
                      height: 600,
                      menubar: true,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      setup: (editor) => {
                        editor.on('keydown', function(e) {
                          if (e.key === 'Tab') {
                            e.preventDefault();
                            editor.execCommand('mceInsertContent', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
                          }
                        });
                      }
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </PublicLayout>
  );
}