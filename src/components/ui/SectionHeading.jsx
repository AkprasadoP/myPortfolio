/**
 * Section heading — red mono ordinal, a quiet in-universe kicker
 * ("case files", "patrol log"), then the plain-English title in
 * condensed poster type. The title must make sense to a recruiter;
 * the kicker is where the theme lives.
 */
export const SectionHeading = ({ ordinal, kicker, title, sub }) => {
  return (
    <div className="specimen-head">
      <p className="specimen-head__ordinal">{ordinal}</p>
      <div>
        {kicker && <p className="specimen-head__kicker">{kicker}</p>}
        <h2 className="specimen-head__title">{title}</h2>
        {sub && <p className="specimen-head__sub">{sub}</p>}
      </div>
    </div>
  );
};
