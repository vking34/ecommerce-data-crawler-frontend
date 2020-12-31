import React from "react";
import { Redirect, Route, Switch } from "react-router";


import NotFound from "../notFound/NotFound";
// import { commonStore } from "../common/commonStore";
// import Test from "../test/Test";
import RawSeller from "../rawSeller/RawSeller";
import Crawling from "../crawling/Crawling";
import CrawlSeller from "../crawlSeller/CrawlSeller";
import ShopDetail from "../shopDetail/ShopDetail";
import Home from './../home/Home';
import LoginPage from './../authen/LoginPage';
import HandleRedirect from './../test/HandleRedirect';

export const ListRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/raw-seller" component={RawSeller} />
      <Route exact path="/crawled-sellers" component={CrawlSeller} />
      <Route exact path="/crawling-addition" component={Crawling} />
      <Route exact path="/shop-detail" component={ShopDetail} />
      <Route exact path="/login" component={HandleRedirect} />
      <Route exact path="/404.html" component={NotFound} /> 
      <Redirect to="/404.html" /> 
    </Switch>
  );
};

export const RouterLogin = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Redirect to="/login" />
    </Switch>
  )
}
