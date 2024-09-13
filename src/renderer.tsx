import { Context } from "hono";
import { renderToString } from "react-dom/server";
export function renderer(c: Context) {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link rel="stylesheet" href="/static/style.css" />
          {import.meta.env.PROD ? (
            <script type="module" src="/static/main.js"></script>
          ) : (
            <script type="module" src="/src/main.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  );
}
