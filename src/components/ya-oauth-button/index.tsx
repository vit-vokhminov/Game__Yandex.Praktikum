import React from 'react';
import { connect } from 'react-redux';
import { fetchServiceId } from '../../actions/oauth/service-id';
import { getServiceId } from '../../selectors/collections/oath';

import './ya-oauth-button.css'

const YaOauthButton = ({ serviceId, serviceIdAction }) => {
    const onClickHandler = () => {
        serviceIdAction(`${process.env.APP_URL}`);
    }

    if (serviceId) {
        { window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=https%3A%2F%2Fcharleston-runner-07.ya-praktikum.tech` }
    }    

    return (
        <img
            onClick={onClickHandler}
            className="oauth-button" 
            src="//yastatic.net/doccenter/images/tech2.yandex.ru/ru/passport/doc/dg/freeze/51bY9IrqsJSXhsyJDhVUFulstXs.png" 
            alt="Signin Yandex ID"
        />
    );
}

const mapStateToProps = (store) => ({
    serviceId: getServiceId(store),
});

const mapDispatchToProps = {
    serviceIdAction: fetchServiceId,
};

export default connect(mapStateToProps, mapDispatchToProps)(YaOauthButton);
