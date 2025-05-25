import dynamic from "next/dynamic";
import { getMetadata } from '../lib/metadata';


export const metadata = getMetadata("/contact");

const ContactForm = dynamic(() => import("./contactspage"), { ssr: false });

export default function Page() {
  return <ContactForm />;
}
