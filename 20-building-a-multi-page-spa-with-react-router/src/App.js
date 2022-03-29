import {Redirect, Route, Routes, Switch} from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <Layout>
            <Routes>
                {/*<Switch>*/}
                {/*    <Route path='/' render={() => <Redirect to='/quotes'/>}/>*/}
                {/*</Switch>*/}
                <Route path='/quotes' element={<AllQuotes/>}/>
                <Route path='/quotes/:quoteId' element={<QuoteDetail/>}/>
                <Route path='/new-quote' element={<NewQuote/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Layout>
    );
}

export default App;

{/*react-router-v6*/}

