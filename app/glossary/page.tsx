'use client';
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import PublicLayout from "../layouts/public";

import glossaryData from "../data/terms.json";

const categories = Array.from(new Set(glossaryData.terms.map(term => term.category))).sort();

export default function GlossaryPage() {
    const [selectedTerm, setSelectedTerm] = useState(glossaryData.terms[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
  
    const filteredTerms = glossaryData.terms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  
    const groupedTerms = filteredTerms.reduce((acc: { [key: string]: typeof glossaryData.terms }, term) => {
      const firstLetter = term.term[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(term);
      return acc;
    }, {});
  
    const sortedLetters = Object.keys(groupedTerms).sort();
  
    return (
      <PublicLayout title="Glossary">
        <div className="container py-8">
          <h1 className="mb-6 text-4xl font-bold">Glossary</h1>
          <p className="text-lg mb-4 leading-relaxed whitespace-pre-wrap">
            Search for terms and their definitions in our glossary.
          </p>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search terms..."
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
                          {groupedTerms[letter].map((term) => (
                            <button
                              key={term.term}
                              onClick={() => setSelectedTerm(term)}
                              className={`w-full rounded-lg px-3 py-2 text-left hover:bg-accent ${
                                selectedTerm?.term === term.term ? 'bg-accent' : ''
                              }`}
                            >
                              <div className="font-medium">{term.term}</div>
                              <div className="text-sm text-muted-foreground">{term.category}</div>
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
              <Card className="h-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">{selectedTerm?.term}</CardTitle>
                  <div className="text-sm text-muted-foreground">{selectedTerm?.category}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed whitespace-pre-wrap text-justify">{selectedTerm?.definition}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }