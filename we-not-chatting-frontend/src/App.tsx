import './App.css';
import Chats from './views/chats/chats';
import Contacts from './views/contacts/contacts';
import Discover from './views/discover/discover';
import Profile from './views/profile/profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainViewsWrapper from './views/mainViewsWrapper/mainViewsWrapper';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainViewsWrapper />}>
            <Route path="chats" element={<Chats />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="discover" element={<Discover />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
