import React, { useEffect, useState } from 'react'
import { Row, Typography } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../apiConfig'
import GridCard from '../LandingPage/Section/GridCard';
import MainImage from '../LandingPage/Section/MainImage';
import MovieInfo from './Section/MovieInfo';
import Favourite from './Section/Favourite';


const {Title} = Typography;

function MovieDetail(props) {
    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)

    useEffect(() => {
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)
        },[]) // eslint-disable-line react-hooks/exhaustive-deps

    function fetchDetailInfo(endpoint) {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        setCasts(result.cast)
                    })

                setLoadingForCasts(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    return (
        <div>
            {/* Header */}
            {!LoadingForMovie ?
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview} 
                />
                :
                <div>loading...</div>
            }


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favourite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>


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
                            !LoadingForCasts ? Casts.map((cast, index) => (
                                cast.profile_path &&
                                <React.Fragment key={'members' + index}>                                
                                    <GridCard actor keyVal={'cast'+index} image={cast.profile_path} characterName={cast.characterName} />
                                </React.Fragment>

                            )) :
                                <div>loading...</div>
                        }
                    </Row>
                <br />
            </div>

        </div>
    )
}

export default MovieDetail

