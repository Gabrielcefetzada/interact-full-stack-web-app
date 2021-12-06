import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../variables/api';

function Post() {
	let { id } = useParams();
	const [postObject, setPostObject] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');
	const history = useHistory();

	useEffect(() => {
		const fetchPostById = async () => {
			try {
				const response = await api.get(`posts/byId/${id}`);
				setPostObject(response.data);
			} catch (error) {
				console.log(error.message);
			}
		};

		const fetchCommentById = async () => {
			try {
				const response = await api.get(`comments/${id}`);
				setComments(response.data);
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchPostById();
		fetchCommentById();
	}, []);

	const addComment = async () => {
		try {
			const response = await api.post(
				'comments/',
				{
					commentBody: newComment,
					PostId: id,
				},
				{
					headers: {
						accessToken: localStorage.getItem('accessToken'),
					},
				}
			);

			if (response.data.error) {
				alert('You must be loggeg to comment something.');
			} else {
				const commentToAdd = {
					commentBody: newComment,
					username: response.data.username,
				};
				setComments([...comments, commentToAdd]);
				setNewComment('');
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const deletePost = async (id) => {
		try {
			await api.delete(`posts/${id}`, {
				headers: { accessToken: localStorage.getItem("accessToken") },
			  })
			  history.push('/');
			  alert('Post Deleted.');
		} catch ( error ) {
			console.log(error.message)
		}
	}

	return (
		<div className='postPage'>
			<div className='leftSide'>
				<div className='post' id='individual'>
					<div className='title'> {postObject.title} </div>
					<div className='body'>{postObject.postText}</div>
					<div className='footer'>{postObject.username}
					{localStorage.getItem('currentUser') === postObject.username && (
						<button onClick={() => deletePost(postObject.id)}>Delete Post</button>
					)}
					</div>
				</div>
			</div>
			<div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
				<br></br>
                <label> Wrote By: {comment.username}</label>
              </div>
            );
          })}
        </div>
      </div>
		</div>
	);
}

export default Post;
