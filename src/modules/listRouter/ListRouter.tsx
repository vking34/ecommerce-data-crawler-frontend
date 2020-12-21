import React from "react";
import { Redirect, Route, Switch } from "react-router";


import NotFound from "../notFound/NotFound";
// import { commonStore } from "../common/commonStore";
import Test from "../test/Test";
import RawSeller from "../rawSeller/RawSeller";
import ShopState from "../shopState/ShopState";
import Crawling from "../crawling/Crawling";
import CrawlSeller from "../crawlSeller/CrawlSeller";
import ShopDetail from "../shopDetail/ShopDetail";

export const ListRouter = () => {
  return (
    <Switch>
          <Route exact path="/" component={Test} />
          <Route exact path="/raw-seller" component={RawSeller} />
          <Route exact path="/crawl-seller" component={CrawlSeller} />
          <Route exact path="/shop-state" component={ShopState} />
          <Route exact path="/crawling-addition" component={Crawling} />
          <Route exact path="/shop-detail" component={ShopDetail} />
          <Route exact path="/404.html" component={NotFound} />
          <Redirect to="/404.html" /> 
    </Switch>
  );
};
