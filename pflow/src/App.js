import React from 'react';
import Header from './main/Header';
import Main from './main/Main';
import Footer from './main/Footer';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Chatbot from './chatbot/Chatbot';
import Community from './community/Community';
import Post from './community/Post'; 

import Mypage from './mypage/Mypage';
import Myactive from './mypage/Myactive';
import MyResume from './mypage/MyResume';

import Resume from './resume/Resume';
import Resume1 from './resume/Resume1';
import Resume2 from './resume/Resume2';
import Resume3 from './resume/Resume3';
import Resume4 from './resume/Resume4';
import Resume5 from './resume/Resume5';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';




function App() {
  return (
   
    <ThemeProvider>
      <ProgressProvider>
    <Router>
        <div className='main-container'>
        <div className='landing-page'>
           <Header />
          <Routes>  
            <Route path="/" element={
              <>
                <Main />
              </>
            } />
             <Route path="/resume/Resume" element={<Resume />} />
            <Route path="/resume/Resume1" element={<Resume1 />} />
            <Route path="/resume/Resume2" element={<Resume2 />} />
            <Route path="/resume/Resume3" element={<Resume3 />} />
            <Route path="/resume/Resume4" element={<Resume4 />} />
            <Route path="/resume/Resume5" element={<Resume5 />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Chatbot" element={<Chatbot />} />
            <Route path="/Mypage" element={<Mypage />} />
            <Route path="/Mypage/Myactive" element={<Myactive />} />
            <Route path="/Mypage/MyResume" element={<MyResume />} />
            <Route path="/Community" element={<Community />} />
            <Route path="/Community/:board_id" element={<Post />} />
          </Routes>
        <Footer />
        </div>
      </div>
    </Router>
    </ProgressProvider>
    </ThemeProvider>
  
  );
}

export default App;
