
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FaqPage() {
  const faqItems = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our collection, add books to your cart, and proceed to checkout. You'll be asked to provide shipping and payment information to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has shipped, you will receive an email with a tracking number and a link to the carrier's website. You can also find your order status and tracking information in the 'Order History' section of your profile."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for books in their original condition. If you're not satisfied with your purchase, please contact our support team to initiate a return."
    },
    {
        question: "How do personalized recommendations work?",
        answer: "Our recommendation engine uses your browsing history, purchase history, and wishlist to suggest books you might enjoy. The more you interact with our site, the better your recommendations will become!"
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we only ship within the United States. We are working on expanding our shipping options to include international destinations in the near future."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-12 md:py-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our bookstore and services.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-headline text-lg text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
