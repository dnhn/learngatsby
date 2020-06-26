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
import { processSearchQuery } from '../utils/helper.js';

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
}) => (
  <div>
    <label
      htmlFor="alg-autocomplete"
      className="visually-hidden"
    >
      Tìm kiếm nhanh
    </label>
    <input
      id="alg-autocomplete"
      type="search"
      placeholder="tìm kiếm nhanh"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />
    {currentRefinement && <Hits hitComponent={Hit} hits={hits} />}
  </div>
));

export default ({
  location: { search },
}) => {
  const { alg = '' } = processSearchQuery(search);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
    >
      <Autocomplete defaultRefinement={alg} />
      <PoweredBy
        translations={{ searchBy: 'tìm kiếm bằng' }}
      />
    </InstantSearch>
  );
};
