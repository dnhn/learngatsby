---
title: Code
datetime: 2020-06-09
slug: code
---
    export default ({ data }) => <h1>{data.site.siteMetadata.title}</h1>;

```
export default const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
```
