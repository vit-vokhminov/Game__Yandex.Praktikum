import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "redux/store";
import { checkAuth } from "redux/reducers/user/userActions";
import { Start, SignIn, SignUp, ForumPosts, ForumPost, ForumAddPost, LeaderBoard, Profile, ErrorPage } from './pages';
import { GameStatic, PrivateRoute } from 'components';
import 'assets/styles/style.css';

function App() {
    const dispatch = useAppDispatch();
    const { userAuth, isLoading, gameRunner } = useAppSelector((store: any) => store.userSlice);
    
    React.useEffect(() => {
        dispatch(checkAuth());
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
