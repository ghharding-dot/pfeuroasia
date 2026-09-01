import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SearchAuthorityGuide } from "../../components/SearchAuthorityGuide";
import { createMetadata, RouteSeo } from "../../lib/seo";
import { searchGuides, searchGuideSlugs } from "../../lib/searchGuides";

export function generateStaticParams() {
  return searchGuideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = searchGuides[slug];
  return guide ? createMetadata(guide.seoKey) : {};
}

export default async function SearchGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = searchGuides[slug];
  if (!guide) notFound();

  return (
    <RouteSeo pageKey={guide.seoKey}>
      <SearchAuthorityGuide guide={guide} />
    </RouteSeo>
  );
}
