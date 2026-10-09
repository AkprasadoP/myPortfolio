/**
 * Specimen section heading — numbered-triplet ordinal + oversized title.
 * Linear discipline: the number is small and red, the title does the work.
 */
export const SectionHeading = ({ ordinal, title, sub }) => {
  return (
    <div className="specimen-head">
      <p className="specimen-head__ordinal">{ordinal}</p>
      <h2 className="specimen-head__title">{title}</h2>
      {sub && <p className="specimen-head__sub">{sub}</p>}
    </div>
  );
};
