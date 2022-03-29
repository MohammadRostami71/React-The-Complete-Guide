import {Link, Route, useParams, useRouteMatch} from "react-router-dom";
import {Fragment, useEffect} from "react";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
    const {sendRequest, data: loadedQuote, status, error} = useHttp(getSingleQuote, true);
    const params = useParams();
    const match = useRouteMatch();
    const {quoteId} = params;
    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest]);
    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        );
    }
    if (error) {
        return (
            <p className='centered focused'>{error}</p>
        );
    }
    if (!loadedQuote.text) {
        return <p>not quote found</p>
    }
    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`} component={Comments}/>
        </Fragment>

    );
};

export default QuoteDetail;