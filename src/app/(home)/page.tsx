import FooterPrimary from "./FooterPrimary";
import HeaderPrimary from "./HomePrimary";
import TopicsOverview from "./TopicsOverview";

export default function HomePage() {
  return (
    <div>
      <HeaderPrimary />
      <TopicsOverview />
      <FooterPrimary />
    </div>
  );
}
