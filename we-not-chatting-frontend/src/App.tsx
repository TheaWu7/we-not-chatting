import "./App.css";
import Chats from "./views/chats/chats";
import Contacts from "./views/contacts/contacts";
import Discover from "./views/discover/discover";
import Profile from "./views/profile/profile";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MainViewsWrapper from "./views/mainViewsWrapper/mainViewsWrapper";
import Register from "./views/register/register";
import Login from "./views/login/login";
import NewFriends from "./views/newFriends/newFriends";
import AddFriends from "./views/addFriends/addFriends";
import Moments from "./views/moments/moments";
import { ToastContainer } from "react-toastify";
import UserProfile from "./views/userProfile/userProfile";
import UserProfileViewContextProvider from "./contexts/userProfileViewContext";
import ChattingView from "./views/chatting/chatting";
import UserDataContextProvider from "./contexts/userDataContext";
import { Navigate } from "react-router-dom";
import PostMoment from "./views/postMoment/postMoment";
import WebSocketContextProvider from "./contexts/websocketContext";

const EnsureAuth = () => (localStorage["wnc_token"] ? <Outlet /> : <Navigate to="/login" />);

function App() {
  return (
    <div className="App">
      <UserDataContextProvider>
        <UserProfileViewContextProvider>
          <WebSocketContextProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<EnsureAuth />}>
                  <Route path="/main" element={<MainViewsWrapper />}>
                    <Route path="chats" element={<Chats />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="discover" element={<Discover />} />
                    <Route path="profile" element={<Profile />} />
                  </Route>
                  <Route path="chatting" element={<ChattingView />} />
                  <Route path="/newFriends" element={<NewFriends />} />
                  <Route path="/addFriends" element={<AddFriends />} />
                  <Route path="/moments" element={<Moments />} />
                  <Route path="/userProfile" element={<UserProfile />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/postMoment" element={<PostMoment />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </WebSocketContextProvider>
        </UserProfileViewContextProvider>
      </UserDataContextProvider>
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar
        newestOnTop={false}
        rtl={false}
      />
    </div>
  );
}

export default App;
