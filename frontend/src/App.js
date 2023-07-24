import React from 'react';
import './App.css';
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            {/* 로그인 페이지 이동 */}
            <Route path="/login" element={<Login />} />
            {/* 회원가입 페이지 이동 */}
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
