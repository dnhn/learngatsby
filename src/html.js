import React from 'react';
import PropTypes from 'prop-types';
import { googleFonts } from './utils/constant';
import { siteMetadata } from '../gatsby-config';

const HTML = props => (
  <html
    lang="vi"
    {...props.htmlAttributes}
  >
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content={siteMetadata.description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0, shrink-to-fit=no"
      />
      <title>{siteMetadata.title}</title>

      {/**
        * Google fonts loading optimisation
        * https://csswizardry.com/2020/05/the-fastest-google-fonts
        * */}
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        rel="preload"
        as="style"
        href={googleFonts}
      />
      <noscript>
        <link
          rel="stylesheet"
          type="text/css"
          href={googleFonts}
        />
      </noscript>
      {/* End Google fonts */}

      {props.headComponents}

      <link
        rel="icon"
        type="image/png"
        href="/logo.png"
      />
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <div
        key={`body`}
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      {props.postBodyComponents}
    </body>
  </html>
);

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};

export default HTML;
