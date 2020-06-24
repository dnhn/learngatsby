import React from 'react';
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Panel,
  PoweredBy,
  SearchBox,
  Snippet,
  Stats,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY,
);

const Hit = ({ hit }) => (
  <Panel
    header={<Highlight
      attribute="title"
      hit={hit}
    />}
    footer={<Highlight
      attribute="slug"
      hit={hit}
    />}
  >
    <Snippet
      attribute="excerpt"
      hit={hit}
    />
  </Panel>
);

export default () => (
  <InstantSearch
    searchClient={searchClient}
    indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
  >
    <Configure snippetEllipsisText="…" />
    <SearchBox
      translations={{
        placeholder: 'nhấn ‘s’ để bắt đầu tìm kiếm',
      }}
    />
    <Stats
      translations={{
        stats: (nbHits, timeSpentMS) =>
          `${nbHits} kết quả trong ${timeSpentMS} mili giây`
      }}
    />
    <Hits hitComponent={Hit} />
    <PoweredBy
      translations={{ searchBy: 'tìm kiếm bằng' }}
    />
  </InstantSearch>
);
