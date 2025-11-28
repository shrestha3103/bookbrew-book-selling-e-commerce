
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Book, genres } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const bookFormSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  author: z.string().min(2, { message: 'Author must be at least 2 characters.' }),
  genre: z.string({ required_error: 'Please select a genre.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  originalPrice: z.coerce.number().positive({ message: 'Price must be a positive number.' }).optional().or(z.literal('')),
  stock: z.coerce.number().int().min(0, { message: 'Stock cannot be negative.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

interface AddBookFormProps {
  onBookAdd: (book: Omit<Book, 'id' | 'rating' | 'reviews' | 'coverImage' | 'imageHint'>) => void;
  initialData?: Book;
}

export function AddBookForm({ onBookAdd, initialData }: AddBookFormProps) {
  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      originalPrice: initialData.originalPrice || '',
    } : {
      title: '',
      author: '',
      price: 0,
      stock: 0,
      description: '',
      originalPrice: '',
    },
  });

  const onSubmit = (data: BookFormValues) => {
    onBookAdd({
        ...data,
        originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined
    });
  };

  const isEditing = !!initialData;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-headline">{isEditing ? 'Edit Book' : 'Add New Book'}</DialogTitle>
        <DialogDescription>
          {isEditing ? 'Update the details below.' : 'Fill in the details below to add a new book to the catalog.'}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="The Great Gatsby" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="F. Scott Fitzgerald" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genres.map(genre => <SelectItem key={genre} value={genre}>{genre}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                    <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Original Price (Optional)</FormLabel>
                    <FormControl>
                    <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          </div>
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="A novel about the American dream..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">{isEditing ? 'Save Changes' : 'Add Book'}</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
