import dynamic from "next/dynamic";
import { getMetadata } from '../lib/metadata';


export const metadata = getMetadata("/careers");

const Careers = dynamic(() => import("./careerspage"), { ssr: false });

export default function Page() {
  return <Careers />;
}
