"use client";
import { useState } from "react";
import { Search, SendHorizontal, Loader2, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/ui/file-uploader";
import { useToast } from "@/hooks/use-toast";
import PublicLayout from "./layouts/public";
import { useUploadFileMutation, useValidateDocumentMutation } from "./queries"; // Redux hooks
type ValidationItem = {
  message: string;
  state: boolean | null; // `null` for loading, `true` for success, `false` for failure
};

export default function Home() {
  const [responsePopup, setResponsePopup] = useState<string | null>(null);

  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [validations, setValidations] = useState<ValidationItem[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  // Redux mutations
  const [uploadFile] = useUploadFileMutation();
  const [validateDocument] = useValidateDocumentMutation();
  // const handleFileChange = async (files: File[]) => {
  //   setUploadedFiles(files);
  // };
  const handleFileChange = async (files: File[]) => {
    setUploadedFiles(files);
    setIsUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        // Upload file and get response with fileId and fileType
        const response = await uploadFile(formData).unwrap();

        // Assuming the response includes fileId and fileType
        const { fileId, fileType } = response.data; // Adjust based on your API response structure

        // Attach fileId and fileType to each file
        file["fileId"] = fileId;
        file["fileType"] = fileType;

        toast({
          title: "File Uploaded",
          description: `File ${file.name} uploaded successfully.`,
          duration: 3000,
        });
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: `Error uploading files. Please try again.`,
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };


  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    toast({
      title: "Question Sent",
      description: "Our AI assistant is processing your question.",
      duration: 3000,
    });

    // Hardcoded AI response
    const aiResponse = `
    Deschiderea unui SRL (societate cu răspundere limitată) în Republica Moldova implică următoarele etape:\n
    1. Alegerea denumirii: Trebuie să alegi un nume unic pentru afacerea ta. Poți verifica disponibilitatea numelui pe site-ul Camerei de Înregistrare a Statului.\n
    2. Definirea obiectului de activitate: Trebuie să stabilești exact care va fi domeniul de activitate al societății tale.\n
    3. Crearea Statutului: Statutul este un document care stabilește regulile de bază pentru funcționarea companiei. Acesta trebuie să fie redactat în conformitate cu Legea Republicii Moldova privind întreprinderile (în special, art. 77-93).\n
    4. Înregistrarea la Camera Înregistrării de Stat: Trebuie să depui o cerere de înregistrare, statutul, actul de proprietate sau contractul de închiriere pentru sediul societății, dovada plății taxelor de înregistrare și alte documente necesare.\n
    5. Deschiderea unui cont bancar: După înregistrare, vei primi un certificat de înregistrare și un cod fiscal. Cu aceste documente, poți deschide un cont bancar în numele companiei.\n\n
    Te sfătuiesc să consulti un avocat sau un consultant în afaceri pentru a te asigura că respectezi toate reglementările legale și fiscale necesare.
`;

  setTimeout(() => {
    setResponsePopup(aiResponse); // Store the response in the state to display in the popup
  }, 1000);  // Store the response in the state to display in the popup
  };

  // const handleFileCheck = () => {
  //   if (uploadedFiles.length === 0) {
  //     toast({
  //       variant: "destructive",
  //       title: "No Files",
  //       description: "Please upload files first.",
  //       duration: 3000,
  //     });
  //     return;
  //   }

  //   // Initialize validations with a loading state
  //   const initialValidations: ValidationItem[] = [
  //     { message: "Determine type of documents", state: null },
  //     { message: "Verify document integrity", state: null },
  //     { message: "Check for duplicate entries", state: null },
  //   ];
  //   setValidations(initialValidations);
  //   setIsChecking(true);

  //   // Simulate checks with a timer
  //   let currentIndex = 0;
  //   const interval = setInterval(() => {
  //     setValidations((prev) => {
  //       if (currentIndex >= prev.length) {
  //         clearInterval(interval);
  //         setIsChecking(false);
  //         return prev;
  //       }

  //       // Randomly determine success or failure
  //       const updated = [...prev];
  //       updated[currentIndex].state = Math.random() > 0.5;
  //       currentIndex++;
  //       return updated;
  //     });
  //   }, 5000);
  // };
  const handleFileCheck = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No Files",
        description: "Please upload files first.",
        duration: 3000,
      });
      return;
    }

    // Start with loading validation
    const initialValidations: ValidationItem[] = uploadedFiles.map(() => ({
      message: "Determining type of documents",
      state: null,
    }));
    setValidations(initialValidations);
    setIsChecking(true);

    try {
      const validationPromises = uploadedFiles.map(async (file, index) => {
        if (!file.fileId || !file.fileType) {
          // If fileId or fileType is missing, skip this file
          return;
        }

        const response = await validateDocument({
          fileId: file.fileId,
          fileType: file.fileType,
        }).unwrap();

        // Assuming your response has an errorCode to determine success
        const validationState = response.errorCode === 0;

        setValidations((prevValidations) => {
          const updatedValidations = [...prevValidations];
          updatedValidations[index] = {
            message: "Document validated successfully", // Adjust message as needed
            state: validationState,
          };
          return updatedValidations;
        });
      });

      await Promise.all(validationPromises);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Validation Failed",
        description: "There was an error validating the files.",
        duration: 3000,
      });
    } finally {
      setIsChecking(false);
    }
  };


  const closePopup = () => {
    setResponsePopup(null); // Close the popup by clearing the response
  };

  return (
    <PublicLayout title="Home">
      <main className="container my-10 flex items-center justify-center">
        <div className="flex items-center justify-between space-x-[10vw]">
          <div>
            <h1 className="mb-6 max-w-[600px] text-5xl font-bold">Need help?</h1>
            <div className="max-w-[570px]">
              <p className="max-w-[520px] text-lg text-gray-600">
                Ask a question here. Santa's little helpers are here to help you.
              </p>
              <div className="mt-4 space-y-4">
                {/* Search/Prompt Section */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4"
                >
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
                    <Button type="submit" className="flex items-center gap-2">
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
                    disabled={isUploading || isChecking}
                    className="mt-4 flex items-center gap-2"
                  >
                    Check files
                  </Button>
                )}
              </div>

              {/* Validation Results */}
               {/* Validation Results */}
               {validations.length > 0 && (
                <ul className="mt-6 space-y-4">
                  {validations.map((validation, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-4 p-2 border rounded-lg"
                    >
                      {validation.state === null && (
                        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                      )}
                      {validation.state === true && (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      )}
                      {validation.state === false && (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                      <span className="text-gray-700">{validation.message}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="w-auto">
            <Image
              width={458}
              height={446}
              src="/skeleton.webp"
              alt="skeleton"
              className="rounded-lg"
            />
          </div>
        </div>
      </main>

      {/* Popup for showing response */}
      {responsePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full max-h-[500px] overflow-y-auto">
            <h2 className="text-2xl font-semibold">AI Response</h2>
            <p className="mt-4 text-base">{responsePopup}</p>
            <Button onClick={closePopup} className="mt-6">Close</Button>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
