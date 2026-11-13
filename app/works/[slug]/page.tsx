import { works } from "@/lib/data";
import { WorkContent } from "@/components/work-content";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default function WorkPage() {
  return <WorkContent />;
}
