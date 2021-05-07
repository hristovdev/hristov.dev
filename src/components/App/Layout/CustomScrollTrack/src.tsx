const CustomScrollTrack: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ style, ...props }) => (
  <div {...props} style={{ ...style, background: "rgba(255, 255, 255, 0.05)", borderRadius: "5px" }} />
);

export default CustomScrollTrack;
