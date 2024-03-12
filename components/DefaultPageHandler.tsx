import { Frontmatter } from "@/frontmatter";
import { PropsWithChildren, ReactNode } from "react";

interface Props {
  frontmatter: Frontmatter;
}

const DefaultPageHandler: React.FC<PropsWithChildren<Props>> = ({
  frontmatter,
  children,
}) => {
  return (
    <>
      <title>{`Hristov.DEV - ${frontmatter.title}`}</title>
      <header
        id="page-header"
        className="background-grid background-grid--fade-out border-divider-light z-[900] mb-10 border-b pt-32 pb-10 md:mb-0 md:border-none md:pb-20 md:pt-40 dark:border-divider-dark"
      >
        <div className="content-wrapper">
          <div>
            <h1 className="text-[2.5rem] font-extrabold leading-tight md:text-7xl md:leading-snug">
              {frontmatter.title}
            </h1>
          </div>
          <div>
            <p className="mt-4 text-lg text-gray-600 md:mt-6 md:text-2xl lg:max-w-[500px] xl:max-w-[700px] dark:text-gray-400">
              {frontmatter.description}
            </p>
          </div>
        </div>
      </header>

      <div className="content-wrapper flex-shrink-0 overflow-hidden lg:overflow-visible">
        <div className="flex flex-row-reverse gap-8 xl:gap-24">
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default DefaultPageHandler;
