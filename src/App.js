import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import UserForm from './pages/UserForm';
import Users from './pages/Users';
import NotFound from './pages/NotFound';


function App() {
  return (
    <main className='container'>
      <Switch>
        <Route path="/users/:id" component={UserForm}></Route>
        <Route path="/users" component={Users}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from='/' exact to='/users'></Redirect>
        <Redirect to='/not-found'></Redirect>
      </Switch>
    </main>
  );
}

export default App;
