import type { Locale } from "../Locale.ts";

interface Action {
  url: string;
  label: {
    [locale in Locale]: string;
  };
}

export interface Section {
  title: {
    [locale in Locale]: string;
  };
  description: {
    [locale in Locale]: string;
  };
  action?: Action;
}

export interface Page {
  slug: string;
  title: {
    [locale in Locale]: string;
  };
  sections: Section[];
}
