declare module "*.mdx" {
  import { Frontmatter } from "./frontmatter";

  export const frontmatter: Frontmatter;
  export const title: string;
}
