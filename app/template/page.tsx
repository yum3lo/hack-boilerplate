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

const categories = Array.from(new Set(templatesData.templates.map(name => name.category))).sort();

// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ]

export default function TemplatePage() {
  const [selectedTerm, setSelectedTerm] = useState(templatesData.templates[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
  
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

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

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
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
  
            <div className="lg:col-span-2">
              

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
