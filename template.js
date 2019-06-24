export default () => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>BUYRENT</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <style>
          a{
              text-decoration: none
            }
          </style>
          <style id="jss-server-side"></style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`
}
