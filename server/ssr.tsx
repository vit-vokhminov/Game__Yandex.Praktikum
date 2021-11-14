import React from 'react';
import { renderToString } from 'react-dom/server';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ChunkExtractor } from '@loadable/server';
import App from '../src/App';

export default function render(req, res, store) {
    const location = req.originalUrl;
    const context = {};
    const statsFile = path.resolve('./dist/server/loadable-stats.json');
    const chunkExtractor = new ChunkExtractor({ statsFile });
    const jsx = chunkExtractor.collectChunks(
        <ReduxProvider store={store}>
            <StaticRouter location={location} context={context}>
                <App />
            </StaticRouter>
        </ReduxProvider>,
    );

    const html = renderToString(jsx);
    const reduxState = store.getState();
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="google-site-verification" content="nLL5VlSAgcKL756luG6o6UwKcvR8miU2duRnhU-agmE" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" type="image/png" href="/images/favicon.png">
    <link rel="stylesheet" href="client.css">
    <link rel="stylesheet" href="pages.css">
</head>
<body>
    <div id="root">${html}</div>
    <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
    </script>
    <script src='client.js'></script>
    <script src='emoji-picker-react.js'></script>
   
</body>
</html>
`;
}
