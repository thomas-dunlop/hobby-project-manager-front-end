import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  HomePage,
  Recipes,
  Inventory,
  Login,
  ProjectPage
} from './pages';



function App() {
  return (
    <div className="App">
      <header className="App-header">
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
            integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
            crossorigin="anonymous"
          />
      </header>

      <body>
        <Router>
          <Switch> 
            <Route path = "/Recipes">
              <Recipes />
            </Route>
            <Route path = "/Login">
              <Login />
            </Route>
            <Route path = "/Inventory">
              <Inventory />
            </Route>
            <Route path = "/Projects/:id">
              <ProjectPage />
            </Route>
            <Route path = "/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </body>
    </div>
  );
}

export default App;
