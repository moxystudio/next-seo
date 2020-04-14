import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const commonMetaAttributes = ['name', 'http-equiv', 'property', 'itemprop'];
const commonLinkAttributes = ['rel', 'href'];

const getKey = (attributes, common) => {
    const key = common.map((attr) => attributes[attr] ? `${attr}_${attributes[attr]}` : '').filter(Boolean).join('#');

    return key || Math.random().toString(36).substr(2, 9);
};

const renderLink = (data) => data.map((attributes) =>
    <link key={ getKey(attributes, commonLinkAttributes) } { ...attributes } />,
);

const renderMeta = (data) => data.map((attributes) =>
    <meta key={ getKey(attributes, commonMetaAttributes) } { ...attributes } />,
);

const renderData = (data) => Object.entries(data).map(([key, value]) => {
    switch (key) {
    case 'title':
        return <title key="title">{ value }</title>;
    case 'meta':
        return renderMeta(value);
    case 'link':
        return renderLink(value);
    default:
        return null;
    }
});

const Seo = ({ data }) =>
    <Head>{ renderData(data) }</Head>;

Seo.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        meta: PropTypes.arrayOf(PropTypes.object),
        link: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
};

export default Seo;
