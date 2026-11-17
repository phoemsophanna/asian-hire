export type GeneralSettings = {
  header_logo?: string | null;
  footer_logo: string | null;
  description: string;
};

export type MenuRow = {
  key: string;
  label: string;
  href: string;
  show_in_header: boolean;
  show_in_mobile: boolean;
  is_active: boolean;
};
