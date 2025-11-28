
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { genres, authors } from "@/lib/data";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SheetClose } from '../ui/sheet';

export interface FilterState {
  search: string;
  genre: string;
  author: string;
  priceRange: [number, number];
  rating: string;
}

interface BookFiltersProps {
  initialState: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  isMobile?: boolean;
}

export function BookFilters({ initialState, onApplyFilters, isMobile = false }: BookFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const handleInputChange = (id: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const handleSliderChange = (value: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
  };

  const handleSubmit = () => {
    onApplyFilters(filters);
  };
  
  const button = <Button className="w-full" onClick={handleSubmit}>Apply Filters</Button>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input 
            id="search" 
            placeholder="Title, author..." 
            value={filters.search}
            onChange={e => handleInputChange('search', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select value={filters.genre} onValueChange={value => handleInputChange('genre', value)}>
            <SelectTrigger id="genre">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Select value={filters.author} onValueChange={value => handleInputChange('author', value)}>
            <SelectTrigger id="author">
              <SelectValue placeholder="All Authors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Authors</SelectItem>
              {authors.map(author => (
                <SelectItem key={author} value={author}>{author}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Price Range: Rs. {filters.priceRange[0]} - Rs. {filters.priceRange[1]}</Label>
          <Slider
            value={filters.priceRange}
            onValueChange={handleSliderChange}
            max={3000}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Rs. 0</span>
            <span>Rs. 3000</span>
          </div>
        </div>

        <div className="space-y-3">
            <Label>Rating</Label>
            <RadioGroup value={filters.rating} onValueChange={value => handleInputChange('rating', value)} className="space-y-2">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="r-all"/>
                    <Label htmlFor="r-all" className="font-normal">Any</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="r-4"/>
                    <Label htmlFor="r-4" className="font-normal">4 stars & up</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="r-3"/>
                    <Label htmlFor="r-3" className="font-normal">3 stars & up</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="r-2"/>
                    <Label htmlFor="r-2" className="font-normal">2 stars & up</Label>
                </div>
            </RadioGroup>
        </div>
        {isMobile ? (
          <SheetClose asChild>
            {button}
          </SheetClose>
        ) : (
          button
        )}
      </CardContent>
    </Card>
  );
}
