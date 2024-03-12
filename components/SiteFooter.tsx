import { MENU_ITEMS } from "@/helpers/constants";
import Link from "next/link";

export default () => {
  return (
    <footer className="background-grid background-grid--fade-in border-divider-light mt-24 pt-16 text-sm text-slate-900 dark:border-divider-dark dark:text-slate-200">
      <div className="content-wrapper">
        <div className="py-10 font-semibold">
          <div className="flex flex-col-reverse gap-16 lg:flex-row">
            <div className="flex-1">
              <div className="max-w-[348px]">
                <div className="mb-3 text-[13px] text-slate-600 dark:text-slate-400">
                  About Me
                </div>
                <p className="mb-4 font-normal leading-relaxed">
                  I'm Hristo, a <strong>full-stack developer</strong> who loves
                  intuitive, flexible and clean code.
                </p>
                <ul className="-ml-2 flex gap-1">
                  <li>
                    <a
                      href="https://github.com/hristovdev"
                      target="_blank"
                      rel="noreferrer nofollow"
                      className="flex h-9 w-9 items-center justify-center"
                      aria-label="My GitHub profile"
                      title="My GitHub profile"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        role="img"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <title>GitHub Icon</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="-mx-2 flex flex-1 flex-col gap-8 sm:flex-row sm:gap-16 lg:mx-0 justify-end">
              <div className="flex sm:gap-16">
                <div className="flex-1 text-right">
                  <div className="mb-2 text-[13px] text-gray-600 dark:text-gray-400">
                    Navigation
                  </div>
                  <ul className="flex flex-col ">
                    {MENU_ITEMS.map((item) => (
                      <li key={item.name}>
                        <Link className="footer-link" href={item.href}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-divider-light flex justify-between border-t py-6 text-xs dark:border-divider-dark">
          <div className="font-semibold">
            ©{new Date().getFullYear()}, hristov.dev
          </div>
          <div className="text-slate-500 dark:text-slate-400">
            <a
              href="https://github.com/hristovdev"
              target="_blank"
              rel="noreferrer nofollow"
              className="hover:underline"
            >
              <span>see the recent update on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
