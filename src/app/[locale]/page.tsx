import Hero from "@/components/Hero";
import Identity from "@/components/Identity";
import Showcase from "@/components/Showcase";
import { getProducts, getSiteImages } from "@/lib/db-queries";

export const revalidate = 60;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [products, siteImages] = await Promise.all([
    getProducts(locale),
    getSiteImages(),
  ]);

  return (
    <>
      <Hero heroImage={siteImages.hero_image} />
      <Identity />
      <Showcase
        products={products}
        signatureImage1={siteImages.signature_image_1}
        signatureImage2={siteImages.signature_image_2}
      />
    </>
  );
}
