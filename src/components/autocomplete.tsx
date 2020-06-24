import React from 'react';
import {
  Highlight,
  Hits,
  InstantSearch,
  Panel,
  PoweredBy,
  Snippet,
  connectAutoComplete,
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

const Autocomplete = connectAutoComplete(({
  hits,
  currentRefinement,
  refine,
}: {
  hits: object[],
  currentRefinement?: string,
  refine: any,
}) => (
  <div>
    <input
      type="search"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />
    {currentRefinement && <Hits hitComponent={Hit} hits={hits} />}
  </div>
));

export default () => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
    >
      <Autocomplete />
      <PoweredBy
        translations={{ searchBy: 'tìm kiếm bằng' }}
      />
    </InstantSearch>
  );
};
