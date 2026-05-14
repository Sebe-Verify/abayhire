import { MarketingPage } from "@/components/ui/marketing-page";
import { marketingPages } from "@/lib/site-content";

export default function ContactPage() {
  return <MarketingPage {...marketingPages.contact} />;
}
