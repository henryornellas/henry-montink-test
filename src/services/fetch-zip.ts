interface FetchZipProps {
  zipCode: string;
}

export default async function fetchZip({ zipCode }: FetchZipProps) {
  const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
  const { bairro, uf, logradouro, localidade } = await response.json();

  return {
    city: localidade || "",
    state: uf || "",
    street: logradouro || "",
    neighborhood: bairro || "",
  };
}
