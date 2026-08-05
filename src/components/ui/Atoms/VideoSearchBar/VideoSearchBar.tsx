import { JSX } from 'react';
import { getLocale } from "next-intl/server";
// TODO Update domain
const VideoSearchBar = async (): Promise<JSX.Element> => {
  const locale = await getLocale();
  return <div>
    Video Search Bar
    <ti-coveo-search-box search-box-id="videoSearchBox" search-interface-id="videoSearch" redirect-url={`//www.ti.com/sitesearch/en-us/docs/universalsearch.tsp?langPref=${locale}&preFilter=videos_Video,Video%20series`}></ti-coveo-search-box>
  </div>
};

export default VideoSearchBar;

