'use client';

import { useState } from "react";
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import PublicLayout from "../layouts/public";

interface BusinessField {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  type?: string;
}

const requiredFields: BusinessField[] = [
  {
    id: "idno",
    label: "IDNO",
    description: "State Identification Number, which also serves as the Taxpayer Identification Number",
    type: "text"
  },
  {
    id: "registrationCertificate",
    label: "Certificate of Registration",
    description: "Proof of company registration (a scanned copy or reference number)",
    type: "text"
  },
  {
    id: "companyName",
    label: "Company Name",
    description: "Official name of the business",
    type: "text"
  },
  {
    id: "businessAddress",
    label: "Business Address",
    description: "Registered address of the company",
    type: "text"
  },
  {
    id: "iban",
    label: "IBAN",
    description: "Business bank account details for financial transactions",
    type: "text"
  },
  {
    id: "email",
    label: "Contact Email",
    description: "Primary email address for business communication",
    type: "email"
  },
  {
    id: "phone",
    label: "Contact Phone Number",
    description: "Phone number for correspondence",
    type: "tel"
  }
];

const optionalFields: BusinessField[] = [
  {
    id: "vatNumber",
    label: "VAT Number",
    description: "If the company is registered for VAT (only required for VAT-registered businesses)",
    type: "text"
  },
  {
    id: "nameReservation",
    label: "Name Reservation Certificate",
    description: "Proof of company name reservation (if applicable)",
    type: "text"
  },
  {
    id: "authorizedCapital",
    label: "Authorized Capital Amount",
    description: "Declared capital amount, if relevant (not mandatory in Moldova)",
    type: "number"
  }
];

export default function AccountPage() {
  const router = useRouter();
  const { toast } = useToast();
  //   const { user, isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add your update profile logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "Your business information has been updated.",
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update business information. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const renderField = ({ id, label, description, type, required }: BusinessField) => (
    <div className="relative" key={id}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className="absolute right-2 top-2 cursor-pointer z-10"
              onClick={() => description && router.push('/glossary')}
            >
            </div>
          </TooltipTrigger>
          {description && (
            <TooltipContent>
              <p className="max-w-xs">{description}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <FloatingLabelInput
        id={id}
        type={type || "text"}
        label={label}
        value={formData[id] || ''}
        onChange={(e) => setFormData(prev => ({ ...prev, [id]: e.target.value }))}
        className="max-w-[300px]"
        required={required}
      />
    </div>
  );

  return (
    <PublicLayout title="Account Settings">
      <main className="container my-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="mb-6 text-4xl font-bold">
            Profile Details
          </h1>
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-4">
                <Image
                  src="/avatar.png"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <CardTitle className="text-2xl font-bold">Company Information</CardTitle>
                  <CardDescription>Manage your business details and documentation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">Essential Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requiredFields.map(renderField)}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">Optional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {optionalFields.map(renderField)}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button type="submit" className="min-w-[200px]" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </PublicLayout>
  );
}