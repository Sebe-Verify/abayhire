import { MarketingPage } from "@/components/ui/marketing-page";
import { marketingPages } from "@/lib/site-content";

export default function CareersPage() {
  return <MarketingPage {...marketingPages.careers} />;
}
