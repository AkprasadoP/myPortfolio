export const LOADING_COPY = "recalibrating web-shooters...";

export const LoadingLabel = ({ className = "" }) => (
  <span className={`loading-label ${className}`.trim()}>{LOADING_COPY}</span>
);
