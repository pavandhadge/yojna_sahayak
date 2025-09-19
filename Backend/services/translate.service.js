export const translate = async (text, target) => {
  try {
    const url = new URL("https://translate.googleapis.com/translate_a/single");
    url.searchParams.append("client", "gtx");
    url.searchParams.append("sl", "auto");
    url.searchParams.append("tl", target);
    url.searchParams.append("dt", "t");
    url.searchParams.append("q", text);

    const response = await fetch(url.toString());
    const data = await response.json();

    return data[0][0][0];
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Error translating text");
  }
};
