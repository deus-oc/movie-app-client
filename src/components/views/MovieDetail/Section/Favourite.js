import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';



function Favourite(props) {
    const user = useSelector(state => state.user)
    let variables;
    if(props.favPage){
        variables = {
            movieId: props.movieInfo.movieId,
            userFrom: props.movieInfo.userFrom,
            movieTitle: props.movieInfo.movieTitle,
            moviePost: props.movieInfo.moviePost,
            movieRunTime: props.movieInfo.movieRunTime
        }
    } else {
        variables = {
            movieId: props.movieId,
            userFrom: props.userFrom,
            movieTitle: props.movieInfo.title,
            moviePost: props.movieInfo.backdrop_path,
            movieRunTime: props.movieInfo.runtime
        }     
    }
    const [FavouriteNumber, setFavouriteNumber] = useState(0)
    const [Favourited, setFavourited] = useState(false);

    useEffect(() => {

        axios.post('/api/favourite/favouriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavouriteNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get Favourite Number')
                }
            })

        axios.post('/api/favourite/favourited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavourited(response.data.subcribed)
                } else {
                    alert('Failed to get Favourite Information')
                }
            })

    }, [])

    const onClickFavourite = () => {
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (Favourited) {
            //when we are already subscribed 
            axios.post('/api/favourite/removeFromFavourite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavouriteNumber(FavouriteNumber - 1)
                        setFavourited(!Favourited)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            // when we are not subscribed yet
            axios.post('/api/favourite/addToFavourite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavouriteNumber(FavouriteNumber + 1)
                        setFavourited(!Favourited)
                    } else {
                        alert('Failed to Add To Favourite')
                    }
                })
        }
    }

    return (
        <>
            <Button danger onClick={onClickFavourite} disabled={user.userData && !user.userData.isAuth} > {!Favourited ? "Favourite " : "!Favourite "} {user.userData && user.userData.isAuth ? FavouriteNumber: ''}</Button>
        </>
    )
}

export default Favourite;