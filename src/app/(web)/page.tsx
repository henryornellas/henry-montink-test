import Loading from "@/components/loading";
import { ProductDetail } from "@/layouts";
import { getProductPreference } from "@/services";
import fetchProduct from "@/services/fetch-product";
import { Suspense } from "react";

interface ProductPageProps {
  searchParams: Promise<{
    id: string;
  }>;
  params: Promise<{
    id: string;
  }>;
}

// Podemos utilizar aqui tanto o ID do produto vindo do parametro ou dos parametros de busca em um caso real

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Web({ params, searchParams }: ProductPageProps) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ProductDetailWrapper productId="1" />
      </Suspense>
    </>
  );
}

async function ProductDetailWrapper({ productId }: { productId: string }) {
  const product = await fetchProduct({ productId });

  const productPreferences = await getProductPreference(productId);

  return (
    <ProductDetail product={product} productPreferences={productPreferences} />
  );
}
