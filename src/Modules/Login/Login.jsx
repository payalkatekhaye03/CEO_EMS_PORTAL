// import React, { useState } from 'react';
// import { Eye, EyeOff, User } from 'lucide-react'; 
// import './Login.css';
// import Header from '../../Components/Header/Header';
// import Dashboard from '../Dashboard/DashBoard';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (username && password) {
//       setIsLoggedIn(true);
//       if (onLogin) onLogin();
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   if (isLoggedIn) {
//     return <Dashboard />;
//   }

//   return (
//     <>
//       <Header showProfile={false} />

//       <div className="login-container">
//         <div className="background-pattern">
//           <div className="circle circle-1"></div>
//           <div className="circle circle-2"></div>
//           <div className="circle circle-3"></div>
//           <div className="circle circle-4"></div>
//           <div className="circle circle-5"></div>
//           <div className="circle circle-6"></div>
//           <div className="circle circle-7"></div>
//           <div className="circle circle-8"></div>
//         </div>

//         <div className="login-card">
//           <form onSubmit={handleLogin} className="login-form">
          
//             <div className="input-group">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="form-input"
//                 required
//               />
//               <span className="input-icon-right">
//                 <User size={20} />
//               </span>
//             </div>

//             <div className="input-group">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="form-input"
//                 required
//               />
             
//                <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="password-toggle"
//               >
//                 {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
//               </button>
//             </div>

//             <button type="submit" className="login-button">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import Header from '../../Components/Header/Header';
import Dashboard from '../Dashboard/DashBoard';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
     
      Swal.fire({
        title: 'Login Successful!',
        
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        setIsLoggedIn(true);
        if (onLogin) onLogin();
      }, 2000);
    } else {
       Swal.fire({
        title: 'Error!',
        text: 'Incorrect username or password. Please try again!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <>
      <Header showProfile={false} />
      <ToastContainer />
      <div className="login-container">
        <div className="background-pattern">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="circle circle-5"></div>
          <div className="circle circle-6"></div>
          <div className="circle circle-7"></div>
          <div className="circle circle-8"></div>
        </div>

        <div className="login-card">
          <form onSubmit={handleLogin} className="login-form">
            {/* Username field */}
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
              />
              <span className="input-icon-right">
                <User size={20} />
              </span>
            </div>
            {errors.username && <p className="error">{errors.username}</p>}

            {/* Password field */}
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
