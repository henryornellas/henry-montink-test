function cep(text: string) {
  return text.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
}

function clearString(text: string) {
  const replace = text.replace(/\D/g, "");

  return replace;
}

const masks = {
  cep,
  clearString,
};

export default masks;
