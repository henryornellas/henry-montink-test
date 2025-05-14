"use client";

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  fetchZip,
  type ProductPreferences,
  setProductPreferences,
} from "@/services";
import type { Address, Product } from "@/types";
import { cn, masks } from "@/utils";
import { Heart } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useState, useTransition } from "react";

interface ProductDetailProps {
  product: Product;
  productPreferences: ProductPreferences;
}

export default function ProductDetail({
  product,
  productPreferences,
}: ProductDetailProps) {
  const [loadingAddress, startTransition] = useTransition();

  const [address, setAddress] = useState<Address | null>(
    productPreferences?.address || null
  );
  const [zipCodeInput, setZipCodeInput] = useState<string>(
    productPreferences?.zipCode || ""
  );
  const [selectedProductColorId, setSelectedProductColorId] = useState(
    productPreferences?.color || product.colors[0].id
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    productPreferences?.size || product.sizes[0]
  );
  const [selectedImage, setSelectedImage] = useState(
    productPreferences?.image || product.images[0].src
  );
  const [favorite, setFavorite] = useState(
    productPreferences?.favorite || false
  );

  const imagesBasedOnSelectedColor = product.images.filter(
    (e) => e.colorId === selectedProductColorId
  );

  function findAddressFromZip({ target }: ChangeEvent<HTMLInputElement>) {
    setZipCodeInput(masks.cep(target.value));

    const zipRegex = /^\d{5}-?\d{3}$/;
    const isZipValid = zipRegex.test(target.value);

    if (isZipValid) {
      startTransition(async () => {
        const { city, state, street, neighborhood } = await fetchZip({
          zipCode: masks.clearString(target.value),
        });

        const userAddress = { city, state, street, neighborhood };

        setAddress(userAddress);

        await setProductPreferences(product.id, {
          zipCode: target.value,
          address: userAddress,
        });
      });
    }
  }

  async function handleColorChange(colorId: string) {
    setSelectedProductColorId(colorId);

    const newImage = product.images.find(
      (image) => image.colorId === colorId
    )?.src;

    setSelectedImage(newImage || product.images[0].src);

    await setProductPreferences(product.id, { color: colorId });
  }

  async function handleSizeChange(size: string) {
    setSelectedProductSize(size);

    await setProductPreferences(product.id, { size });
  }

  async function handleImageChange(image: string) {
    setSelectedImage(image);

    await setProductPreferences(product.id, { image });
  }

  async function handleFavorite() {
    setFavorite((prev) => !prev);

    await setProductPreferences(product.id, { favorite: !favorite });
  }

  return (
    <main className="px-5 lg:px-0 py-10 bg-primary-200/20">
      <div className="flex flex-col lg:flex-row flex-1 container mx-auto lg:justify-between gap-10 lg:gap-20 p-5 lg:p-10 rounded-2xl border border-primary-300 shadow-lg bg-white">
        <div className="flex flex-col gap-6 w-full lg:w-1/3 shrink-0">
          <div className="relative overflow-hidden rounded-lg w-full aspect-square bg-gray-100">
            <Image src={selectedImage} alt="" fill className="object-cover" />
          </div>

          <div className="flex gap-2">
            {imagesBasedOnSelectedColor.map(({ src }) => (
              <button
                type="button"
                onClick={async () => handleImageChange(src)}
                key={src}
                className={cn(
                  "cursor-pointer size-16 overflow-hidden relative border rounded-lg bg-gray-300 transition-colors duration-150 hover:border-gray-800",
                  selectedImage === src && "shadow-lg border-primary-100"
                )}
              >
                <Image src={src} fill className="object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 font-semibold">
          <div className="flex justify-between gap-5">
            <h1 className="text-2xl leading-6">{product.name}</h1>

            <button
              type="button"
              onClick={handleFavorite}
              className="cursor-pointer"
            >
              <Heart fill={favorite ? "red" : "transparent"} />
            </button>
          </div>

          <p className="text-4xl font-normal text-gray-900">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price / 100)}
          </p>

          <p className="font-medium leading-5 text-gray-500">
            {product.description}
          </p>
        </div>

        <div className="flex flex-col gap-6 font-medium lg:w-1/4 text-gray-500">
          <div className="flex flex-col gap-1">
            <p>
              Cor:{" "}
              <span className="font-semibold text-gray-900">
                {
                  product.colors.find(({ id }) => id === selectedProductColorId)
                    ?.name
                }
              </span>
            </p>

            <Select
              defaultValue={selectedProductColorId}
              onValueChange={handleColorChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma cor" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map((color) => (
                  <SelectItem key={color.id} value={color.id}>
                    {color.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <p>
              Tamanho:{" "}
              <span className="font-semibold text-gray-900">
                {selectedProductSize}
              </span>
            </p>

            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={async () => await handleSizeChange(size)}
                  className={cn(
                    "cursor-pointer size-10 border text-base rounded-lg transition-colors duration-150 hover:border-gray-800",
                    selectedProductSize === size &&
                      "text-gray-900 shadow-lg border-primary-100"
                  )}
                >
                  <p>{size}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <p>CEP:</p>

            <label htmlFor="zipCode" className="mb-4">
              <Input
                type="text"
                maxLength={9}
                value={zipCodeInput}
                placeholder="Ex: 01538-000"
                onChange={findAddressFromZip}
              />
            </label>

            {loadingAddress && !address && <p>Buscando endereço...</p>}

            {address && (
              <p className="leading-4 font-medium text-primary-100">{`${address.street} ${address.neighborhood} ${address.city} ${address.state}`}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
