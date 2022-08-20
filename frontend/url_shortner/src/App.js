import './App.css';
import { Routes, Route } from "react-router-dom"
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { RedirectPage } from './components/redirect/redirect';
import { UrlStats } from './components/stats/stats';
import { Login } from './components/auth/login';
import { Signup } from './components/auth/signup';
import { UserUrls } from './components/home/myUrl';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/myUrls" element={<UserUrls />}></Route>
        <Route path="/shorten/:shortUrl" element={<RedirectPage />}></Route>
        <Route path="/stats/:shortUrl" element={<UrlStats />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
