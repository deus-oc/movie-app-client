import React, { useEffect, useState } from 'react'
import { Row, Typography } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../apiConfig'
import MainImage from './Section/MainImage';
import GridCard from './Section/GridCard';
import MovieInfo from '../MovieDetail/Section/MovieInfo';

const {Title} = Typography;
const path = `${IMAGE_BASE_URL}${POSTER_SIZE}`;

function LatestPage() {
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    useEffect(() => {
        fetchDetails(`${API_URL}movie/latest?api_key=${API_KEY}&language=en-US`);
    }, []);

    async function fetchDetails(endpoint){
        let resMovie = await fetch(endpoint);
        resMovie = await resMovie.json();
        setMovie(resMovie);
        setLoadingForMovie(false)
        const movieId = resMovie.id;
        let resCast = await fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`);
        resCast = await resCast.json();            
        setCasts(resCast.cast);
        setLoadingForCasts(false)
    }

    return (
        <div style={{width:'100%', margin: 0}}>
            <div style={{margin: '1rem', alignItems: 'center'}} > 
                <Title level={2}> Latest Movie </Title>
            </div>
            {/* Movie Main Image */}
            {!LoadingForMovie ?
                <MainImage
                    image={Movie.backdrop_path || Movie.poster_path  
                        ? Movie.backdrop_path ? `${path}${Movie.backdrop_path}` : `${path}${Movie.poster_path}`
                        : null}
                    title={Movie.original_title}
                    text={Movie.overview}
                /> : <div> Loading... </div>
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div> */}


                {/* Movie Info */}
                {!LoadingForMovie ?
                    <MovieInfo movie={Movie} />
                    :
                    <div>loading...</div>
                }
                <br />

                <Title level={2}> Cast </Title>
                <hr />
                <br />

                {/* Actors Grid*/}
                    <Row gutter={[16, 16]}>
                        {
                            !LoadingForCasts ? Casts.length > 0 ?  Casts.map((cast, index) => (
                                cast.profile_path &&
                                <React.Fragment key={'members_latest' + index}>                                
                                <GridCard actor keyVal={'cast_latest'+index} image={cast.profile_path} characterName={cast.characterName} />
                                </React.Fragment>

                            )) 
                            : <div style={{textAlign: 'center'}}> No Info on Cast Members </div>
                            : <div>loading...</div>
                        }
                    </Row>
                <br />
            </div>

        </div>
        )
}

export default LatestPage
