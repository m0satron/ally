export interface DirectusContentBlock {
  id: string;
  type: "header" | "paragraph";
  data: {
    text: string;
  };
}
