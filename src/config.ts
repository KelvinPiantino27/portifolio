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
  /** Drop the file at public/cv.pdf. Empty hides the button. */
  cvUrl: string;
  /**
   * Live avatar URL. GitHub serves the current avatar from a permanent URL, so
   * changing it there changes it here with no rebuild. Empty, or a URL that
   * fails to load, falls back to the monogram.
   */
  photoUrl: string;
  initials: string;
}

/** Contact details and links. Identical in both languages, so they live here. */
export const SITE: Site = {
  name: "Kelvin Piantino",
  email: "kelvin_piantino@hotmail.com",
  phone: "+55 13 99637-3658",
  phoneHref: "tel:+5513996373658",
  whatsapp: "https://wa.me/5513996373658",
  linkedin: LINKEDIN_URL,
  location: "São Paulo, BR",
  cvUrl: "./cv.pdf",
  // size=264 is 2x the 132px slot, for retina.
  photoUrl: "https://github.com/KelvinPiantino27.png?size=264",
  initials: "KP",
};
