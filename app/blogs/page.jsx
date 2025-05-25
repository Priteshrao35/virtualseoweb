import dynamic from "next/dynamic";
import { getMetadata } from '../lib/metadata';


export const metadata = getMetadata("/blogs");

const OurBlogs = dynamic(() => import("./blogpage"), { ssr: false });

export default function Page() {
  return <OurBlogs />;
}