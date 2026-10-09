import { stack } from "@/data/site";

const ITEMS = [
  ...stack.languages,
  ...stack.frontend,
  ...stack.backend,
  ...stack.data,
  ...stack.infra,
];

export const StackMarquee = () => {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="stack-marquee" aria-hidden="true">
      <div className="stack-marquee__track">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="stack-marquee__item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
