import AppBanner from '../../appBanner/AppBanner';
import { Link } from 'react-router-dom';

const SingleCharacterLayout = (({ element }) => {
    const { name, description, thumbnail} = element;
    return (
        <>
            <AppBanner />
            <div className="single-element">
                <img src={thumbnail} alt={name} className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
                <Link to="/" className="single-comic__back">Back to all</Link>
            </div>
        </>

    )
})

export default SingleCharacterLayout;