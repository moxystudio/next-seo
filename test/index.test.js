import React from 'react';
import { shallow } from 'enzyme';
import Seo from '../src/Seo';

jest.mock('next/head', () => ({ children }) => <div data-test="mock-head">{ children }</div>);

const defaultProps = {
    data: {
        title: 'test title',
        meta: [
            {
                name: 'description',
                content: 'test description',
            },
            {
                property: 'og:title',
                content: 'test title',
            },
            {
                itemprop: 'name',
                content: 'test name',
            },
            {
                'http-equiv': 'content-type',
                content: '30',
            },
            {
                name: 'description',
                property: 'og:description',
                content: 'test description',
            },
            {
                foo: 'bar',
            },
        ],
        link: [
            {
                rel: 'icon',
                href: '/favicon.ico',
            },
            {
                rel: 'stylesheet',
                href: '/styles.css',
            },
        ],
        foo: 'bar',
    },
};

const renderWithProps = (props = {}) => shallow(<Seo { ...defaultProps } { ...props } />);

describe('Seo Component', () => {
    it('should render correctly with props', () => {
        const tree = renderWithProps();

        expect(tree).toMatchSnapshot();
    });
});
