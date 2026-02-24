import { productConfig } from "./product";

export const features = {
  publicacoes: productConfig.plan !== "essential",
  biblioteca: productConfig.plan === "editorial" || productConfig.plan === "analytical",
  pesquisa: productConfig.plan === "analytical",
  parceiros: true,
};
