import React, {useState, useEffect} from 'react';
import { Typography, Row, Card, Col } from 'antd';
import {IMAGE_BASE_URL, POSTER_SIZE } from '../../apiConfig';
import axios from 'axios';
import './FavouritePage.css';
import Favourite from '../MovieDetail/Section/Favourite';

const {Title} = Typography;
const { Meta } = Card;



const Favouritepage = () => {
    const [Favourites, setFavourites] = useState([])
    const [Loading, setLoading] = useState(true)
    let variables = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        fetchFavoredMovie()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const fetchFavoredMovie = () => {
        axios.post('/api/favourite/getFavouredMovie', variables)
            .then(response => {
                if (response.data.success) {
                    setFavourites(response.data.favourites)
                    setLoading(false)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }


    return (
        <div>
            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>
                <Title level={2}> Favourites </Title>
                <hr />
                <br />
                <Row gutter={[16, 16]}>
                    {!Loading && Favourites.map((movie, index) => (
                        <Col span={8} key={'favmovies' + index}>
                            <Card    
                                hoverable
                                style={{ width: '100%',margin: '1rem'}}
                                cover={<img alt="example" src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.moviePost}`} />}
                            >
                                <Meta style={{ display: 'flex', justifyContent: 'center'}}title={<a href={`/movie/${movie.movieId}`} > {movie.movieTitle} </a>} />
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                                    <Favourite favPage movieInfo={movie} movieId={movie.movieId} userFrom={localStorage.getItem('userId')} />
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {Loading && <div> No data present in Favourites </div>}          
            </div>
        </div>
    );
}

export default Favouritepage;
