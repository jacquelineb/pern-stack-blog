import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Blog from './components/Blog';
import style from './styles/App.module.scss';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    JSON.parse(localStorage.getItem('isAuthenticated')) ? true : false
  );

  const [currentUser, setCurrentUser] = useState(() => {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? currentUser : null;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('currentUser', currentUser);
  }, [isAuthenticated, currentUser]);

  async function handleLogIn(credentials) {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (response.status === 200) {
      setIsAuthenticated(true);
      const { user } = await response.json();
      setCurrentUser(user);
    }

    return response.status;
  }

  async function handleLogOut() {
    const response = await fetch('http://localhost:5000/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.status === 200) {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
    console.log(await response.json());
  }

  return (
    <>
      <Router>
        <NavBar isAuth={isAuthenticated} currUser={currentUser} logOut={handleLogOut} />
        <div className={style.mainContent}>
          <Switch>
            <Route exact path={['/', '/page/:pageNum([1-9][0-9]*)']}>
              <Blog isAuth={isAuthenticated} />
            </Route>
            <Route exact path='/login'>
              {isAuthenticated ? <Redirect to='/dashboard' /> : <Login logIn={handleLogIn} />}
            </Route>
            <Route exact path='/dashboard'>
              {isAuthenticated ? <Dashboard /> : <Redirect to='/login' />}
            </Route>
            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
