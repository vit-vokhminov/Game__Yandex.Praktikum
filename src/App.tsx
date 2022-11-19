import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Start, SignIn, SignUp, ForumPosts, ForumPost, ForumAddPost, LeaderBoard, Profile, ErrorPage } from './pages';
import { GameStatic, PrivateRoute } from 'components';
import { sagaFetchCheckAuth } from 'redux/store/userReducer';
import 'assets/styles/style.css';

function App() {
    const dispatch = useDispatch();
    const {userAuth, isLoading, gameRunner} = useSelector((state: any) => state.userReducer);

    React.useEffect(() => {
        dispatch(sagaFetchCheckAuth());
    }, [dispatch]);
    
    return (
        <div className='App'>
            {!gameRunner && <GameStatic />}

            <Routes>
                <Route path='/signin' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
                
                {isLoading ? null : <Route element={<PrivateRoute redirectLink={"/signin"} condition={userAuth} />}>
                    <Route path="/" element={<Start />} />
                    <Route path="/forum" element={<ForumPosts />} />
                    <Route path="/forum-topic/:id" element={<ForumPost />} />
                    <Route path="/forum-add-topic" element={<ForumAddPost />} />
                    <Route path="/leaderboard" element={<LeaderBoard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>}
                
            </Routes>
        </div>
    );
}

export default App;
