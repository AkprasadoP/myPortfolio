import { site } from "@/data/site";

/**
 * Press credential strip. Peter freelances for the Bugle —
 * this reads as an ID badge, not a headline poster.
 */
export const DailyBugleBanner = () => {
  return (
    <div className="daily-bugle-banner">
      <div className="bugle-masthead">
        <span>THE DAILY BUGLE — PRESS</span>
        <span className="bugle-masthead-sub">NEW YORK · QUEENS</span>
      </div>
      <h3 className="bugle-headline">
        {site.name} · {site.role}
      </h3>
      <div className="bugle-subhead">
        <span>CONTRIBUTOR</span>
        <span>{site.currentRole}</span>
      </div>
    </div>
  );
};
