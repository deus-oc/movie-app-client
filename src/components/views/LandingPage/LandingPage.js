import React, { useEffect, useState, useRef } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../apiConfig'

import {Typography, Row} from 'antd';
import MainImage from './Section/MainImage';
import GridCard from './Section/GridCard';
const {Title} = Typography;


function LandingPage() {
    const buttonRef = useRef(null);

    const [movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)


    useEffect(() => {
        fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])


    const loadMoreItems = () => {
        setLoading(true);
        fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`);
    }

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 1) {
            buttonRef.current.click();
        }
    }

    async function fetchMovies(endpoint){
        let res = await fetch(endpoint);
        res = await res.json();
        setMovies([...movies, ...res.results]);
        setMainMovieImage(MainMovieImage || res.results[0]);
        setCurrentPage(res.page);
        setLoading(false);
    }


    return (
        <div style={{width:'100%', margin: 0}}>
            {/* Movie Main Image */}
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>
                <Title level={2}> Popular Movies </Title>
                <hr />
                
                <Row gutter={[16, 16]}>
                    {movies && movies.map((movie, index) => (
                        <React.Fragment key={'movies' + index}>
                            <GridCard
                                keyVal={'movie' + index}
                                image={movie.poster_path ?`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>
                <br />
                {loading && <div>Loading...</div>}

                <div style={{ display: 'none', justifyContent: 'center' }}>
                    <button ref={buttonRef} onClick={loadMoreItems} />
                </div>
            </div>
        </div>
        )
}

export default LandingPage
