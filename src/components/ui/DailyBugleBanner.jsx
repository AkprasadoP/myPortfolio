import { site } from "@/data/site";
import { SpideyEmblem } from "@/components/ui/SpideyEmblem";

const EXCLAMATIONS = ["!", "!!", "!!!", "??!"];

/**
 * Daily Bugle-style newspaper headline banner. Picks a recurring editorial
 * riff off the persona ("FRIENDLY NEIGHBORHOOD...") with a red masthead
 * accent and yellowed paper feel.
 */
export const DailyBugleBanner = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const exclaim = EXCLAMATIONS[Math.floor(Math.random() * EXCLAMATIONS.length)];

  return (
    <div className="daily-bugle-banner">
      <div className="bugle-masthead">
        <span className="inline-flex items-center gap-2">
          <SpideyEmblem size={16} fill="#c8102e" />
          The Daily Bugle
        </span>
        <span className="bugle-masthead-sub">NEW YORK · MANHATTAN</span>
      </div>
      <h3 className="bugle-headline">
        FRIENDLY NEIGHBORHOOD DEVELOPER
        <span className="bugle-exclaim">{exclaim}</span>
      </h3>
      <div className="bugle-subhead">
        <span>EXCLUSIVE REPORT</span>
        <span className="hidden sm:inline">
          {site.role} spotted shipping features uptown
        </span>
        <span>{dateStr.toUpperCase()}</span>
      </div>
    </div>
  );
};