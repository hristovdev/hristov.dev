import "styled-components";
import type { ThemeModel } from "./theme";

/* eslint-disable @typescript-eslint/no-empty-interface */

declare module "styled-components" {
  export interface DefaultTheme extends ThemeModel {}
}
