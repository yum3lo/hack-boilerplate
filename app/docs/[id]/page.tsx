'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { TinyMCEEditor } from '@/components/tiny-mce-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface DocumentData {
  title: string;
  content: string;
}

export default function EditDocumentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState<DocumentData>({
    title: '',
    content: ''
  });

  useEffect(() => {
    const fetchDocument = async () => {
      if (params.id === 'new') return;
      try {
        // Replace with your actual API call
        const response = await fetch(`/api/documents/${params.id}`);
        const data = await response.json();
        setDocument(data);
      } catch (error) {
        console.error('Failed to fetch document:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load document"
        });
      }
    };

    fetchDocument();
  }, [params.id, toast]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/documents/${params.id}`, {
        method: params.id === 'new' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(document)
      });

      if (!response.ok) throw new Error('Failed to save');

      toast({
        title: "Success",
        description: "Document saved successfully"
      });

      if (params.id === 'new') {
        const data = await response.json();
        router.replace(`/docs/${data.id}`);
      }
    } catch (error) {
      console.error('Failed to save document:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save document"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <h1 className="text-3xl font-bold">
              {params.id === 'new' ? 'New Document' : 'Edit Document'}
            </h1>
          </div>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save size={16} />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>

        <Input
          type="text"
          placeholder="Document Title"
          value={document.title}
          onChange={(e) => setDocument(prev => ({ ...prev, title: e.target.value }))}
          className="text-xl font-semibold"
        />

        <div className="rounded-lg border">
          <TinyMCEEditor
            initialValue={document.content}
            onChange={(content) => setDocument(prev => ({ ...prev, content }))}
            height={600}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}