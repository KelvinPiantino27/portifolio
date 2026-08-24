/**
 * Perfil do LinkedIn. Fonte única — tudo que aponta para o LinkedIn deriva
 * daqui, então trocar esta linha basta.
 */
export const LINKEDIN_HANDLE = "kelvin-piantino";
export const LINKEDIN_URL = `https://www.linkedin.com/in/${LINKEDIN_HANDLE}`;

interface Site {
  name: string;
  email: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  linkedin: string;
  location: string;
  /** Coloque o arquivo em public/cv.pdf. Vazio esconde o botão. */
  cvUrl: string;
  /**
   * URL do avatar ao vivo. O GitHub serve o avatar atual de uma URL permanente,
   * então trocar lá troca aqui sem rebuild. Vazio, ou URL que falhe ao
   * carregar, cai no monograma.
   */
  photoUrl: string;
  initials: string;
}

/** Contato e links. Iguais nos dois idiomas, por isso moram aqui. */
export const SITE: Site = {
  name: "Kelvin Piantino",
  email: "kelvin_piantino@hotmail.com",
  phone: "+55 13 99637-3658",
  phoneHref: "tel:+5513996373658",
  whatsapp: "https://wa.me/5513996373658",
  linkedin: LINKEDIN_URL,
  location: "São Paulo, BR",
  cvUrl: "./cv.pdf",
  // size=264 é 2x o espaço de 132px, para telas retina.
  photoUrl: "https://github.com/KelvinPiantino27.png?size=264",
  initials: "KP",
};
