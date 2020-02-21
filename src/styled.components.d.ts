import "styled-components";
import { ThemeModel } from "./components/App/theme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeModel {}
}
