import { MarketingPage } from "@/components/ui/marketing-page";
import { marketingPages } from "@/lib/site-content";

export default function SuccessStoriesPage() {
  return <MarketingPage {...marketingPages.successStories} />;
}
