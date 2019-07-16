import React, {Suspense} from "react";
import { Link, Match } from "@reach/router";
import { Spinner } from "../components/Spinner";

export function Navigation({ children, location }) {
  return (
    <>
      <nav
        style={{
          height: 50,
          display: "flex",
          alignItems: "center",
          background: "#b8c5ca",
          padding: "0 16px"
        }}
      >
        <Match path="/:search">
          {({ match }) => (
            <Link
              to="/"
              style={{
                color: "#fff",
                fontWeight: 800,

                width: 200,
                display: "block",
                fontSize: 16
              }}
            >
              {match ? "👈 Back" : <>Home</>}
            </Link>
          )}
        </Match>
      </nav>
      <Suspense fallback={<Spinner loadingText="Suspense Routing" />}>
        {children}
      </Suspense>
    </>
  );
}
