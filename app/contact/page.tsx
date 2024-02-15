import ContactInfo from '@/components/contactInfo/contactInfo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Nathan David McWilliams.',
};

export default function ContactPage() {
  return <ContactInfo></ContactInfo>;
}
