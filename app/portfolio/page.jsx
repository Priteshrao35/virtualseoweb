import dynamic from "next/dynamic";
import { getMetadata } from '../lib/metadata';


export const metadata = getMetadata("/portfolio");

const PortFolio = dynamic(() => import("./portfoliopage"), { ssr: false });

export default function Page() {
  return <PortFolio />;
}
