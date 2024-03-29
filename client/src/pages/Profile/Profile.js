import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import getUser from '../../features/users/api/getUser';
import { BlogPosts, BlogPostWithComments } from '../../features/blogposts';
import NotFound from '../NotFound';
import { UserCard } from '../../features/users';
import banner from '../../assets/header.png';
import style from './Profile.module.scss';

function Profile() {
  const { path } = useRouteMatch();
  const { username } = useParams();
  const [user, setUser] = useState({ data: undefined, isLoading: true });

  useEffect(() => {
    (async () => {
      const userData = await getUser(username);
      setUser({
        data: userData,
        isLoading: false,
      });
    })();
  }, [username]);

  if (user.isLoading) {
    return null;
  }

  if (!user.data) {
    return <NotFound />;
  }

  return (
    <div className={style.Profile}>
      <div className={style.mainContent}>
        <Switch>
          <Route exact path={`${path}/post/:postId([1-9][0-9]*)`}>
            <BlogPostWithComments />
          </Route>
          <Route exact path={[`${path}/`, `${path}/page/:pageNum([1-9][0-9]*)`]}>
            <div>
              <img className={style.banner} src={banner} alt='banner' />
              <div className={style.userCardWrapper}>
                <UserCard
                  username={user.data.username}
                  bio={user.data.bio}
                  avatar={user.data.avatar}
                  size='medium'
                />
              </div>
            </div>
            <BlogPosts />
          </Route>
          <Redirect to={`/profile/${username}`} />
        </Switch>
      </div>
      <div className={style.sideContent}>
        <div className={style.sticky}>
          <UserCard
            username={user.data.username}
            bio={user.data.bio}
            avatar={user.data.avatar}
            size='large'
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
