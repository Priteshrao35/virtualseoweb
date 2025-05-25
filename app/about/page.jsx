import dynamic from "next/dynamic";
import { getMetadata } from '../lib/metadata';


export const metadata = getMetadata("/about");

const AboutusPage = dynamic(() => import("./aboutuspage"), { ssr: false });

export default function Page() {
  return <AboutusPage />;
}
