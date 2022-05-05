import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        return() => {
            onRequest();
        }
    }, [])

    const onRequest = (offset) => {
        getAllComics(offset)
            .then(onComicsListLoaded)
    }


    const onComicsListLoaded = (newComicsList) => {
        setComicsList(comicsList=> [...comicsList, ...newComicsList]);
        setOffset(offset => offset+9);
    }

    const renderComics = (arr) => {
        const items = arr.map((item, i) => {
            return(
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail ? item.thumbnail : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {renderComics(comicsList)}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;