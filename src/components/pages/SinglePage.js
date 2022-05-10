import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';


const SinglePage = ({Component, typePage}) => {
    const { elemId } = useParams();
    const [data, setData] = useState(null);

    const {getComic, getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateElem()
    }, [elemId])

    const updateElem = () => {
        clearError();

        switch(typePage){
            case 'comicPage':
                getComic(elemId).then(onElementLoad).then(() => setProcess('confirmed'));
                break;
            case 'charPage':
                getCharacter(elemId).then(onElementLoad).then(() => setProcess('confirmed'));
                break;
            default:
                throw new Error('Unexpected process state');
        }

    }

    const onElementLoad = (data) => {
        setData(data);
    }


    return (
        <>
            {setContent(process, Component, data)}

        </>

    )
}





export default SinglePage;