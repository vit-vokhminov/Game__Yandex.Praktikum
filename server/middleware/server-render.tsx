import React from 'react';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouterContext } from 'react-router';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { create } from '../../src/store';
import rootSaga from '../../src/sagas';
import App from '../../src/App';
import routes from '../routes';

function getHtml(reactHtml: string, chunkExtractor: ChunkExtractor, reduxState = {}) {
    const scriptTags = chunkExtractor.getScriptTags();
    const linkTags = chunkExtractor.getLinkTags();
    const styleTags = chunkExtractor.getStyleTags();
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="google-site-verification" content="nLL5VlSAgcKL756luG6o6UwKcvR8miU2duRnhU-agmE" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="icon" href="data:;base64,=">
            ${linkTags}
            ${styleTags}
        </head>
        <body>
            <div id="root">${reactHtml}</div>
            <script>
                    window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
            </script>
            ${scriptTags}
        </body>
        </html>
`;
}

export default (req: Request, res: Response) => {
    if (req.query.code) {
        res.redirect(302, `${process.env.APP_URL}/api/oauth/yandex?code=${req.query.code}`);

        return;
    }

    const location = req.url;
    const context: StaticRouterContext = {};

    const initialState = {
        router: {
            location: { location, search: '', hash: '', key: '' },
            action: 'POP',
        },
    };
    const { store } = create(initialState, location);

    function renderApp() {
        const statsFile = path.resolve('./dist/static/loadable-stats.json');
        const chunkExtractor = new ChunkExtractor({ statsFile, entrypoints: ['client'] });
        const jsx = chunkExtractor.collectChunks(
            <ReduxProvider store={store}>
                <StaticRouter context={context} location={location}>
                    <App />
                </StaticRouter>
            </ReduxProvider>,
        );
        const reactHtml = renderToString(jsx);

        const reduxState = store.getState();

        if (context.url) {
            res.redirect(context.url);
            return;
        }

        const html = getHtml(reactHtml, chunkExtractor, reduxState);

        res
            .status(context.statusCode || 200)
            .send(html);
    }

    store
        .runSaga(rootSaga)
        .toPromise()
        .then(() => renderApp())
        .catch((error) => {
            res
                .status(500)
                .send(error.message);
        });

    routes.some(route => {
        const { fetchData: fetchMethod } = route;
        const match = matchPath(
            location,
            route,
        );
        if (match && fetchMethod) {
            fetchMethod({
                dispatch: store.dispatch,
                params: {
                    headers: {
                        cookie: req.headers.cookie || '',
                    },
                },
            });
        }

        return Boolean(match);
    });

    store.close();
};
