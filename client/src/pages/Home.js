import React from 'react';
import axios from 'axios';
import api from '../variables/api';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
	const [listOfProducts, setListOfProducts] = useState([]);
	let history = useHistory();

	useEffect(() => {
		const getPosts = async () => {
			try {
				const response = await api.get('posts');
				setListOfProducts(response.data);
			} catch (error) {
				console.log(error.message);
			}
		};

		getPosts();
	}, []);

/* 	const likeAPost = async (postId) => {

    
      await api.post(
        '/like',
        {
          PostId: postId,
        },
        {
          headers: { accessToken: localStorage.getItem('accessToken') },
        }
      ).then((response) => {
        alert('liked')
      })

	}; */

	return (
		<div>
			{listOfProducts.map((value, key) => {
				return (
					<div
						className='post'
					>
						<div className='title'>
							{value.title} <div />
						</div>
						<div className='body' onClick={() => {
							history.push(`/post/${value.id}`);
						}}>
							{value.postText} <div />
						</div>
						<div className='footer'>
							{value.username}{' '}
						{/* 	<button onClick={() => likeAPost(value.id)}>Like</button>
              {/* <label> {value.Likes.length} </label> */} 
							<div />
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Home;
