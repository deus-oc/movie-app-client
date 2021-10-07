import React from 'react'
import { Col } from 'antd';
import './GridCard.css';
import { IMAGE_BASE_URL } from '../../../apiConfig';
import { Link } from 'react-router-dom';

const POSTER_SIZE = "w154";



function GridCard(props) {
    
    let {actor, keyVal, image, movieId, movieName, characterName} = props;
            if (actor) {
                return (
                    <Col key={keyVal} lg={4} md={6} xs={12}>
                        <div className="image">
                            <img style={{ width: '100%', height: '250px' }} alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
                        </div>
                    </Col>
                )
            } else {
                return (
                    <Col key={keyVal} lg={4} md={6} xs={12}>
                        <div className="image">
                            <Link to={`/movie/${movieId}`}>
                                <img style={{ width: '100%', height: '280px' }} alt={movieName} src={image} />
                            </Link>
                        </div>
                    </Col>
                )
            }
}

export default GridCard