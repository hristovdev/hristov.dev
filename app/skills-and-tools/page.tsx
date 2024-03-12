import DefaultPageHandler from "@/components/DefaultPageHandler";
import Markdown, { frontmatter } from "@/content/skills-and-tools.mdx";

export default () => {
  return (
    <DefaultPageHandler frontmatter={frontmatter}>
      <Markdown />
    </DefaultPageHandler>
  );
};
