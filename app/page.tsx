"use client";

import { useState } from 'react';
import { Search, SendHorizontal } from 'lucide-react';
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/ui/file-uploader";
import { useToast } from "@/hooks/use-toast";
import PublicLayout from "./layouts/public";

export default function Home() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileChange = async (files: File[]) => {
    setUploadedFiles(files);
    
    if (files.length > uploadedFiles.length) {
      setIsUploading(true);
      const newFile = files[files.length - 1];
      
      try {
        // Update progress
        setProgresses(prev => ({
          ...prev,
          [newFile.name]: 0
        }));

        // Simulate upload progress
        const interval = setInterval(() => {
          setProgresses(prev => {
            const currentProgress = prev[newFile.name] || 0;
            if (currentProgress >= 100) {
              clearInterval(interval);
              return prev;
            }
            return {
              ...prev,
              [newFile.name]: currentProgress + 10
            };
          });
        }, 200);

        // Simulate upload completion
        setTimeout(() => {
          clearInterval(interval);
          setProgresses(prev => ({
            ...prev,
            [newFile.name]: 100
          }));
          setIsUploading(false);
          toast({
            title: "Upload Successful",
            description: `${newFile.name} has been uploaded and is ready for processing.`,
            duration: 3000,
          });
        }, 2000);

      } catch (error) {
        console.error('Upload error:', error);
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: "There was a problem uploading your file. Please try again.",
          duration: 5000,
        });
        setIsUploading(false);
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Handle AI bot prompt
    console.log('Sending prompt to AI:', searchQuery);
    
    toast({
      title: "Question Sent",
      description: "Our AI assistant is processing your question.",
      duration: 3000,
    });
  };

  const handleFileCheck = () => {
    if (uploadedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No Files",
        description: "Please upload files first.",
        duration: 3000,
      });
      return;
    }
    
    console.log('Checking files:', uploadedFiles);
    toast({
      title: "Processing Files",
      description: "Analyzing uploaded files...",
      duration: 3000,
    });
  };

  return (
    <PublicLayout title="Home">
      <main className="container my-10 flex items-center justify-center">
        <div className="flex items-center justify-between space-x-[10vw]">
          <div>
            <h1 className="mb-6 max-w-[600px] text-5xl font-bold">
              Need help?
            </h1>
            <div className="max-w-[570px]">
              <p className="max-w-[520px] text-lg text-gray-600">
                Ask a question here. Santa's little helpers are here to help you.
              </p>
              <div className="mt-4 space-y-4">
                {/* Search/Prompt Section */}
                <form onSubmit={handleSearchSubmit} className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="Type your question..." 
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {searchQuery.trim() && (
                    <Button 
                      type="submit"
                      className="flex items-center gap-2"
                    >
                      Send <SendHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                </form>

                {/* File Upload Section */}
                <p className="text-base text-center text-gray-600">Or upload files for analysis</p>
                <FileUploader
                  value={uploadedFiles}
                  onValueChange={handleFileChange}
                  maxFileCount={3}
                  maxSize={4 * 1024 * 1024}
                  progresses={progresses}
                  disabled={isUploading}
                />
                {uploadedFiles.length > 0 && (
                  <Button 
                    variant="secondary"
                    onClick={handleFileCheck}
                    disabled={isUploading}
                    className="mt-4 flex items-center gap-2"
                  >
                    Check files
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="w-auto">
            <Image
              width={458}
              height={446}
              src="/skeleton.webp"
              alt="Skeleton"
              className="rounded-lg"
            />
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}