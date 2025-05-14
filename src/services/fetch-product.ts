import type { Product } from "@/types";

interface FetchProductProps {
  productId: string;
}

// Simulação de uma chamada para o banco com o ID

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function fetchProduct({ productId }: FetchProductProps) {
  const mockProduct = {
    id: "1",
    name: "Camisa Feminina Dry Fit Fitness Proteção Uv Academia",
    price: 3568,
    images: [
      {
        colorId: "1",
        src: "https://http2.mlstatic.com/D_NQ_NP_944600-MLB81379624484_122024-O-camisa-feminina-dry-fit-fitness-proteco-uv-academia.webp",
      },
      {
        colorId: "1",
        src: "https://http2.mlstatic.com/D_NQ_NP_894095-MLB81649082259_122024-O-camisa-feminina-dry-fit-fitness-proteco-uv-academia.webp",
      },
      {
        colorId: "1",
        src: "https://http2.mlstatic.com/D_NQ_NP_753697-MLB81379915554_122024-O-camisa-feminina-dry-fit-fitness-proteco-uv-academia.webp",
      },
      {
        colorId: "1",
        src: "https://http2.mlstatic.com/D_NQ_NP_806966-MLB76897793391_062024-O-camisa-feminina-dry-fit-fitness-proteco-uv-academia.webp",
      },
      {
        colorId: "2",
        src: "https://http2.mlstatic.com/D_NQ_NP_897014-MLB75429057809_032024-O-camisa-feminina-dry-fit-fitness-proteco-uv-academia.webp",
      },
      {
        colorId: "2",
        src: "https://http2.mlstatic.com/D_NQ_NP_611193-MLB76694446166_062024-O-camisa-feminina-dry-fit-fitness-proteco-uv-academia.webp",
      },
      {
        colorId: "2",
        src: "https://http2.mlstatic.com/D_NQ_NP_737790-MLB76694475674_062024-O-camisa-feminina-dry-fit-fitness-proteco-uv-academia.webp",
      },
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { id: "1", name: "Rosa-Choque" },
      { id: "2", name: "Azul-Marinho" },
    ],
    description:
      "A Blusa Feminina Dry Fitness com Proteção UV da marca Via Ello é a escolha perfeita para mulheres que buscam conforto e estilo durante suas atividades físicas. Confeccionada em poliamida, essa blusa é ideal para práticas como caminhada, corrida, ciclismo, musculação e até mesmo Muay Thai. Seu tecido leve e respirável proporciona liberdade de movimento, permitindo que você se concentre no seu desempenho.",
  };

  const response = await new Promise<Product>((resolve) => {
    setTimeout(() => {
      resolve(mockProduct);
    }, 2500);
  });

  return response;
}
