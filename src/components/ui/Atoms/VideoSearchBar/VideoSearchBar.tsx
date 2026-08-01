import { JSX } from 'react';
// TODO 
const VideoSearchBar = (props: {locale?: string}): JSX.Element => {
  return <div>
    Video Search Bar
    <ti-coveo-search-box search-box-id="videoSearchBox" search-interface-id="videoSearch" redirect-url="//www.ti.com/sitesearch/en-us/docs/universalsearch.tsp?langPref=en-US&preFilter=videos_Video,Video%20series"></ti-coveo-search-box>
  </div>
};

export default VideoSearchBar;

