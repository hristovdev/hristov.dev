const font = `"Roboto", sans-serif`;

const breakpoints = ["40em", "52em", "64em"];

const colors = {
  primary: "#22bf90",
  secondary: "white",
  pageBackground: "#100e17",
  text: {
    primary: "white",
    secondary: "gray",
  },
};

const spacing = ["0em", "0.25em", "0.5em", "0.75em", "1em", "1.5em", "2em", "3em", "8em", "12em"];

const fontSizes = {
  text: "0.9em",
  heading: ["1em", "1.25em", "1.5em", "2.5em", "4em", "4.5em"],
};

const letterSpacing = {
  normal: "normal",
  caps: "0.025em",
};

const lineHeights = [1, 1.125, 1.25, 1.5];

const sizes = {
  headerHeight: "80px",
};

const theme = {
  font,
  breakpoints,
  colors,
  spacing,
  fontSizes,
  letterSpacing,
  lineHeights,
  sizes,
};

export type ThemeModel = typeof theme;

export default theme;
