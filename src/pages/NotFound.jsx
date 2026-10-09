import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 pb-8 text-fg">
      <div className="panel accent-red w-full max-w-md">
        <div className="panel-header">
          <span>ERROR 404</span>
          <span>no route</span>
        </div>
        <div className="space-y-4 p-6 text-left">
          <p className="font-mono text-sm text-muted">
            ashish@workbench:~$ open{" "}
            {typeof window !== "undefined"
              ? window.location.pathname
              : "/unknown"}
          </p>
          <p className="text-sm font-semibold tracking-tight text-fg">
            Signal lost.
          </p>
          <p className="text-sm leading-relaxed text-muted">
            That page moved or never existed. Head back — everything real is
            linked from home.
          </p>
          <Link to="/" className="btn-system btn-system-primary inline-flex">
            return home
          </Link>
        </div>
      </div>
    </div>
  );
};
