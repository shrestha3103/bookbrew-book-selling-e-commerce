
'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container mx-auto py-12 md:py-16 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Get in Touch</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Question about an order" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center gap-4">
                        <MapPin className="h-6 w-6 text-primary" />
                        <span>123 Park Street, Kolkata, WB 700016</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary" />
                        <a href="mailto:hello@bookbrew.in" className="hover:text-primary">hello@bookbrew.in</a>
                    </div>
                     <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary" />
                        <span>+91 98765 43210</span>
                    </div>
                </CardContent>
             </Card>
             <div className="h-64 w-full rounded-lg overflow-hidden">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.272183995874!2d88.3503398154157!3d22.5690184851847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277a03b5f6c65%3A0x8300de005d5b7884!2sPark%20Street!5e0!3m2!1sen!2sin!4v1628205009805!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
