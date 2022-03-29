import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
// import AllQuotes from "./pages/AllQuotes";
// import NewQuote from "./pages/NewQuote";
// import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";
// import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));

function App() {
    return (
        <Layout>
            <Suspense fallback={
                <div className='centered'><LoadingSpinner/></div>

            }>
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/quotes'/>
                    </Route>
                    <Route path='/quotes' component={AllQuotes}/>
                    <Route path='/quotes/:quoteId' component={QuoteDetail}/>
                    <Route path='/new-quote' exact component={NewQuote}/>
                    <Route path='*' component={NotFound}/>
                </Switch>
            </Suspense>
        </Layout>
    );
}

export default App;


