import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState("");

    const getMovie = async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setDetail(json.data.movie);
        setLoading(false);
    };
    console.log(detail)

    useEffect(() => {
        getMovie();
    }, []);
    return (
        <div>
            {loading ? <h1>Loading...</h1> : null}
            <div>
                <img src={detail.medium_cover_image} />
                <h3>Title : {detail.title}</h3>
                <h3>Genres : {detail.genres}</h3>
                <h3>Year : {detail.year}</h3>
                <h3>Description : {detail.description_full}</h3>
                <h4><Link to='/'>GO BACK</Link></h4>
            </div>
        </div>

    )
}
export default Detail;