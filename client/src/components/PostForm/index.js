import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = () => {
    const [postText, setPostText] = useState('');

    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                const { viewPosts } = cache.readQuery({ query: QUERY_POSTS });

                cache.writeQuery({
                    query: QUERY_POSTS,
                    data: { posts: [addPost, ...viewPosts] },
                });
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, posts: [...me.posts, addPost] } },
            });
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addPost({
                variables: {
                    postText,
                    postAuthor: Auth.getProfile().data.username,
                },
            });

            setPostText('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'postText' && value.length <= 280) {
            setPostText(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div>
            <h3>Share something with New Spacers</h3>

            {Auth.loggedIn() ? (
                <>
                    <p
                        className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
                            }`}
                    >
                        Character Count : {characterCount}/280
                    </p>
                    <form
                        className='flex-row justify-center justify-space-between-md align-center'
                        onSubmit={handleFormSubmit}
                    >
                        <div className='col-12 col-lg-9'>
                            <textarea
                                name='postText'
                                placeholder='Whatcha thinkin about?'
                                value={postText}
                                className='form-input w-100'
                                style={{ lineHeight: '1.5', resize: 'vertical' }}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className='col-12 col-lg-3'>
                            <button className='btn btn-primary btn-block py-3' type='submit'>
                                Send It!
                            </button>
                        </div>
                        {error && (
                            <div className='col-12 my-3 bg-danger text-white p-3'>
                                {error.message}
                            </div>
                        )}
                    </form>
                </>
            ) : (
                <p>
                    You cant do anything untill you{' '}
                    <Link to='/login'>login</Link> or <Link to='/signup'>signup.</Link>
                </p>
            )}
        </div>
    );
};

export default PostForm;