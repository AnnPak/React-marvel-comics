import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import ComicView from './singleComicLayout/SingleComicLayout';
import CharView from './singleCharacterLayout/SingleCharacterLayout';

import './singleComicPage.scss';


const SinglePage = ({Component, typePage}) => {
    const { elemId } = useParams();
    const [element, setElement] = useState(null);

    const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateElem()
    }, [elemId])

    const updateElem = () => {
        clearError();

        switch(typePage){
            case 'comicPage':
                getComic(elemId).then(onElementLoad);
            case 'charPage':
                getCharacter(elemId).then(onElementLoad);
            default:
                break;
        }

    }

    const onElementLoad = (element) => {
        setElement(element);
    }

    
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !element) ? <Component element={element}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}

        </>

    )
}





export default SinglePage;