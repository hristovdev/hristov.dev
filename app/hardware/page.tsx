import DefaultPageHandler from "@/components/DefaultPageHandler";
import Markdown, { frontmatter } from "@/content/hardware.mdx";

export default () => {
  return (
    <DefaultPageHandler frontmatter={frontmatter}>
      <Markdown />
    </DefaultPageHandler>
  );
};
