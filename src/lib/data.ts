
import { PlaceHolderImages } from './placeholder-images';

export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  genre: string;
  rating: number;
  reviews: number;
  description: string;
  stock: number;
  coverImage: string;
  imageHint: string;
};

export type Order = {
    id: string;
    customer: string;
    email: string;
    total: number;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Canceled';
    date: string;
}

export type User = {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Customer';
    memberSince: string;
}

const findImage = (id: string) => {
    const image = PlaceHolderImages.find(img => img.id === id);
    return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://placehold.co/400x600', hint: 'book cover' };
}

export const books: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 879.20,
    genre: 'Classic',
    rating: 4.5,
    reviews: 1920,
    description: 'A novel about the American dream, set in the Roaring Twenties. It tells the story of the mysterious millionaire Jay Gatsby and his obsession for the beautiful Daisy Buchanan.',
    stock: 50,
    coverImage: findImage('book-1').url,
    imageHint: findImage('book-1').hint,
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 1000.00,
    originalPrice: 1200.00,
    genre: 'Classic',
    rating: 4.8,
    reviews: 2543,
    description: 'A powerful story of justice and innocence set in a small Southern town. The book explores the depths of human nature through the eyes of a young girl, Scout Finch.',
    stock: 35,
    coverImage: findImage('book-2').url,
    imageHint: findImage('book-2').hint,
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    price: 799.20,
    genre: 'Dystopian',
    rating: 4.7,
    reviews: 3102,
    description: 'A chilling prophecy about the future. In a totalitarian superstate, Winston Smith works for the Ministry of Truth and dreams of rebellion against the Party and its leader, Big Brother.',
    stock: 60,
    coverImage: findImage('book-3').url,
    imageHint: findImage('book-3').hint,
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 719.20,
    genre: 'Romance',
    rating: 4.6,
    reviews: 1813,
    description: 'A classic romance novel that follows the tumultuous relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner.',
    stock: 42,
    coverImage: findImage('book-4').url,
    imageHint: findImage('book-4').hint,
  },
  {
    id: 5,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 1199.20,
    originalPrice: 1440.00,
    genre: 'Fantasy',
    rating: 4.9,
    reviews: 4578,
    description: 'The adventure of Bilbo Baggins, a hobbit who is whisked away on an unexpected journey to reclaim a stolen treasure. A prelude to The Lord of the Rings.',
    stock: 75,
    coverImage: findImage('book-5').url,
    imageHint: findImage('book-5').hint,
  },
  {
    id: 6,
    title: 'Dune',
    author: 'Frank Herbert',
    price: 1519.20,
    genre: 'Sci-Fi',
    rating: 4.8,
    reviews: 3987,
    description: 'Set in the distant future amidst a feudal interstellar society, the story of young Paul Atreides, whose family accepts the stewardship of the desert planet Arrakis, the only source of the "spice".',
    stock: 30,
    coverImage: findImage('book-11').url,
    imageHint: findImage('book-11').hint,
  },
  {
    id: 7,
    title: 'Foundation',
    author: 'Isaac Asimov',
    price: 1320.00,
    genre: 'Sci-Fi',
    rating: 4.7,
    reviews: 2150,
    description: 'The epic saga of a band of scientists who struggle to preserve humanity\'s knowledge and culture through a dark age predicted by the new science of psychohistory.',
    stock: 25,
    coverImage: findImage('book-12').url,
    imageHint: findImage('book-12').hint,
  },
  {
    id: 8,
    title: 'Brave New World',
    author: 'Aldous Huxley',
    price: 900.00,
    genre: 'Dystopian',
    rating: 4.6,
    reviews: 2345,
    description: 'A dystopian novel which presents a futuristic World State of genetically modified citizens and an intelligence-based social hierarchy, which challenges the individual.',
    stock: 48,
    coverImage: findImage('book-9').url,
    imageHint: findImage('book-9').hint,
  },
   {
    id: 9,
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    price: 2000.00,
    genre: 'Fantasy',
    rating: 5.0,
    reviews: 10542,
    description: 'The epic fantasy adventure of Frodo Baggins and his quest to destroy the One Ring, a powerful artifact created by the Dark Lord Sauron.',
    stock: 20,
    coverImage: findImage('book-10').url,
    imageHint: findImage('book-10').hint,
  },
  {
    id: 10,
    title: 'Moby Dick',
    author: 'Herman Melville',
    price: 1119.20,
    genre: 'Adventure',
    rating: 4.3,
    reviews: 987,
    description: 'The saga of Captain Ahab and his relentless pursuit of Moby Dick, the great white whale that crippled him on a previous voyage.',
    stock: 15,
    coverImage: findImage('book-6').url,
    imageHint: findImage('book-6').hint,
  },
  {
    id: 11,
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    price: 1599.20,
    genre: 'Historical Fiction',
    rating: 4.4,
    reviews: 876,
    description: 'A historical novel that chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.',
    stock: 10,
    coverImage: findImage('book-7').url,
    imageHint: findImage('book-7').hint,
  },
  {
    id: 12,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 840.00,
    genre: 'Coming-of-Age',
    rating: 4.2,
    reviews: 1543,
    description: 'A story about teenage angst and alienation. The protagonist, Holden Caulfield, recounts his experiences in New York City after being expelled from prep school.',
    stock: 65,
    coverImage: findImage('book-8').url,
    imageHint: findImage('book-8').hint,
  },
  {
    id: 13,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 650.00,
    genre: 'Philosophical',
    rating: 4.7,
    reviews: 5543,
    description: 'The story of Santiago, an Andalusian shepherd boy who dreams of a treasure in Egypt. His journey teaches him about listening to his heart and following his dreams.',
    stock: 80,
    coverImage: findImage('book-1').url, // Placeholder
    imageHint: "desert journey",
  },
  {
    id: 14,
    title: 'A Man Called Ove',
    author: 'Fredrik Backman',
    price: 950.00,
    genre: 'Contemporary Fiction',
    rating: 4.8,
    reviews: 4321,
    description: 'A heartwarming story about a grumpy yet lovable man who finds his solitary world turned upside down when a young family moves in next door.',
    stock: 55,
    coverImage: findImage('book-2').url, // Placeholder
    imageHint: "old man",
  },
  {
    id: 15,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 1250.00,
    genre: 'Non-Fiction',
    rating: 4.9,
    reviews: 6789,
    description: 'A groundbreaking narrative of humanity’s creation and evolution that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be “human.”',
    stock: 40,
    coverImage: findImage('book-3').url, // Placeholder
    imageHint: "human evolution",
  },
  {
    id: 16,
    title: 'The Notebook',
    author: 'Nicholas Sparks',
    price: 850.00,
    genre: 'Romance',
    rating: 4.8,
    reviews: 6543,
    description: 'An epic love story centered around an elderly man who reads a faded notebook to a woman with Alzheimer\'s. The notebook tells the story of a young couple who fell in love in the 1940s.',
    stock: 60,
    coverImage: findImage('book-4').url,
    imageHint: 'couple silhouette',
  },
  {
    id: 17,
    title: 'Outlander',
    author: 'Diana Gabaldon',
    price: 1100.00,
    genre: 'Romance',
    rating: 4.7,
    reviews: 5890,
    description: 'The story of Claire Randall, a married combat nurse from 1945 who is mysteriously swept back in time to 1743, where she is immediately thrown into an unknown world where her life is threatened.',
    stock: 45,
    coverImage: findImage('book-7').url,
    imageHint: 'scottish highlands',
  },
  {
    id: 18,
    title: 'Me Before You',
    author: 'Jojo Moyes',
    price: 920.00,
    genre: 'Romance',
    rating: 4.6,
    reviews: 5210,
    description: 'A heartbreakingly romantic novel that asks what you do when making the person you love happy also means breaking your own heart. It follows the story of a young woman who forms an unlikely bond with a recently-paralyzed man she\'s taking care of.',
    stock: 50,
    coverImage: findImage('book-8').url,
    imageHint: 'couple rain',
  },
];

export const orders: Order[] = [
    { id: 'ORD001', customer: 'Priya Sharma', email: 'priya.sharma@gmail.com', total: 2758.40, status: 'Delivered', date: '2025-11-21' },
    { id: 'ORD002', customer: 'Rohan Gupta', email: 'rohan.gupta@gmail.com', total: 799.20, status: 'Shipped', date: '2025-11-22' },
    { id: 'ORD003', customer: 'Anjali Singh', email: 'anjali.singh@gmail.com', total: 2000.00, status: 'Pending', date: '2025-11-22' },
    { id: 'ORD004', customer: 'Vikram Reddy', email: 'vikram.reddy@gmail.com', total: 1199.20, status: 'Delivered', date: '2025-11-23' },
    { id: 'ORD005', customer: 'Sneha Patel', email: 'sneha.patel@gmail.com', total: 1599.20, status: 'Canceled', date: '2025-11-24' },
    { id: 'ORD006', customer: 'Arjun Mehta', email: 'arjun.mehta@gmail.com', total: 850.00, status: 'Delivered', date: '2025-11-25' },
    { id: 'ORD007', customer: 'Arjun Mehta', email: 'arjun.mehta@gmail.com', total: 1100.00, status: 'Shipped', date: '2025-11-26' },
    { id: 'ORD008', customer: 'Priya Sharma', email: 'priya.sharma@gmail.com', total: 920.00, status: 'Delivered', date: '2025-11-27' },
];

export const users: User[] = [
    { id: 'USR001', name: 'Shrestha Kundu', email: 'codershrestha1@gmail.com', role: 'Admin', memberSince: '2024-01-15' },
    { id: 'USR002', name: 'Priya Sharma', email: 'priya.sharma@gmail.com', role: 'Customer', memberSince: '2025-11-21' },
    { id: 'USR003', name: 'Rohan Gupta', email: 'rohan.gupta@gmail.com', role: 'Customer', memberSince: '2025-11-22' },
    { id: 'USR004', name: 'Anjali Singh', email: 'anjali.singh@gmail.com', role: 'Customer', memberSince: '2025-11-22' },
    { id: 'USR005', name: 'Vikram Reddy', email: 'vikram.reddy@gmail.com', role: 'Customer', memberSince: '2025-11-23' },
    { id: 'USR006', name: 'Arjun Mehta', email: 'arjun.mehta@gmail.com', role: 'Customer', memberSince: '2025-11-25' },
    { id: 'USR007', name: 'Sneha Patel', email: 'sneha.patel@gmail.com', role: 'Customer', memberSince: '2025-11-24' },
]

export const genres = [...new Set(books.map(book => book.genre))];
export const authors = [...new Set(books.map(book => book.author))];
