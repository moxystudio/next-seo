# next-seo

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][build-status-image]][build-status-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/next-seo
[downloads-image]:https://img.shields.io/npm/dm/@moxy/next-seo.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/next-seo.svg
[build-status-url]:https://github.com/moxystudio/next-seo/actions
[build-status-image]:https://img.shields.io/github/workflow/status/moxystudio/next-seo/Node%20CI/master
[codecov-url]:https://codecov.io/gh/moxystudio/next-seo
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/next-seo/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/next-seo
[david-dm-image]:https://img.shields.io/david/moxystudio/next-seo.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/next-seo?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/next-seo.svg

Manage document head SEO metadata in your Next.js projects with a simple data structure.

## Installation

```sh
$ npm install @moxy/next-seo
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.

## Motivation

SEO helps to improve a website’s overall searchability and visibility. Therefore, an efficient SEO is a must have in every website and there should be a good and easy way to manage all the metadata. These metadata can come from multiple sources, from static files to CMS based approaches, in completely different formats.

There are already different ways of managing all of your changes to the document head, but it can be tough to manage the possibility of *duplicates*. An example of a duplicate would be two meta tags defining the description of a page with different values:
```html
<meta name="description" content="desc1">
<meta name="description" content="desc2">
```
Which one should a web crawler assume as the source of truth?

This library aims to solve these problems by analysing common attributes and generating an unique key to exclude duplicates. It also works with a simple data structure that is not bound to any specific origin.

## Usage

```js
import React from 'react';
import Seo from '@moxy/next-seo';

const MyPage = (props) => {
    const metadata = {
        title: 'MyPage Title',
        meta: [
            {
                name: 'description',
                content:'MyPage Description',
            },
            {
                property: 'og:title',
                content: 'MyPage Title',
            },
        ],
    };

    return (
        <>
            <Seo data={ metadata } />
            <div className="container">
                ...
            </div>
        </>
    );
};

export default MyPage;
```

The example above will add to the document head:
```html
<head>
    ...
    <title>MyPage Title</title>
    <meta name="description" content="MyPage Description" />
    <meta property="og:title" content="MyPage Title" />
</head>
```

## API

The `<Seo>` component supports the following props:

#### data

Type: `object`
Required: `true`

The `data` has the following shape:
```js
data: PropTypes.shape({
    title: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    link: PropTypes.arrayOf(PropTypes.object),
}).isRequired,
```

The `title` is a simple key-value pair that will define the page title with the [title tag](https://developer.mozilla.org/docs/Web/HTML/Element/link).

Both `meta` and `link` are an array of objects where each object represents a single entity ([meta](https://developer.mozilla.org/docs/Web/HTML/Element/meta) or [link](https://developer.mozilla.org/docs/Web/HTML/Element/link)). Any key-value pair of these objects will serve as an attribute.

Example:
```js
data: {
        title: 'my title',
        meta: [
            {
                name: 'description',
                content: 'my description',
            },
            {
                property: 'og:title',
                content: 'my title',
            },
            {
                itemprop: 'name',
                content: 'my name',
            },
            {
                'http-equiv': 'content-type',
                content: '30',
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
    },
};
```
Result:
```html
<title>my title</title>
<meta name="description" content="my description" />
<meta property="og:title" content="my title" />
<meta itemprop="name" content="my name" />
<meta http-equiv="content-type" content="30" />
<meta foo="bar" />
<link rel="icon" href="/favicon.ico" />
<link rel="stylesheet" href="/styles.css" />
```

## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```

## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
