import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="system-grain flex min-h-screen items-center justify-center bg-bg px-4 pb-8 text-fg">
      <div className="panel accent-red w-full max-w-md">
        <div className="panel-header">
          <span>ERROR 404</span>
          <span>file not found</span>
        </div>
        <div className="space-y-4 p-6 text-left">
          <p className="font-mono text-sm text-spidey-red">
            ashish@workbench:~$ open{" "}
            {typeof window !== "undefined"
              ? window.location.pathname
              : "/unknown"}
          </p>
          <p className="font-body text-sm leading-relaxed text-muted">
            This page swung off somewhere. Spider-sense says it&apos;s not
            coming back. Try the web — I mean, the nav bar above.
          </p>
          <p className="font-mono text-[11px] text-dim">
            with great routing comes great responsibility
          </p>
          <Link to="/" className="btn-system btn-system-primary inline-flex">
            [ return home ]
          </Link>
        </div>
      </div>
    </div>
  );
};
