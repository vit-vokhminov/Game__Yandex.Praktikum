import express, { Application } from 'express';
import formidable from 'formidable';
import setCookie from 'set-cookie-parser';
import { avatar } from '../../../app/api/users';

export default (app: Application) => {
    app.use('/api/user/profile/avatar', express.urlencoded({ extended: true }));
    app.use('/api/user/profile/avatar', express.json());

    app.put('/api/user/profile/avatar', (req, res) => {
        const form = formidable({ multiples: true });

        form.parse(req, (err, fields, files) => {
            avatar({ avatar: files }, {
                headers: { cookie: req.headers.cookie || '' },
            })
                .then(({ status, data }) => {
                    res
                        .status(status)
                        .send(data);
                })
                .catch((error) => {
                    const { status, data, headers } = error.response;
                    const cookies = setCookie.parse(headers['set-cookie'], {
                        decodeValues: true,
                        map: true,
                    });

                    res
                        .cookie(cookies.uuid.name, cookies.uuid.value)
                        .cookie(cookies.authCookie.name, cookies.authCookie.value)
                        .status(status)
                        .send(data);
                });
        });
    });
    
    return app;
};
