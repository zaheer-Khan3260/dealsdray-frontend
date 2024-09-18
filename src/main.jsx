import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import EmployeeListPage from './pages/EmployeeListPage.jsx'
import CreateEmployeePage from './pages/CreateEmployeePage.jsx'
import ProtectedLayer from './Components/helpers/ProtectedLayer.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import UpdateEmployeePage from './pages/UpdateEmployeePage.jsx'


const router = createBrowserRouter([
  {
    path: '/signup',
    element:(
      <ProtectedLayer authentication={false}>
       <SignupPage/>
      </ProtectedLayer>
    )
  },
  {
    path: "/login",
    element:(
      <ProtectedLayer authentication={false}>
       <LoginPage/>
      </ProtectedLayer>
    )
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedLayer authentication>
            <Dashboard />
          </ProtectedLayer>
        )
      },
      {
        path: "employeeList",
        element: (
          <ProtectedLayer authentication>
            <EmployeeListPage/>
          </ProtectedLayer>
        )
      },
      {
        path: "createEmployee",
        element: (
          <ProtectedLayer authentication>
            <CreateEmployeePage/>
          </ProtectedLayer>
        )
      },
      {
        path: "updateEmployee/:id",
        element: (
          <ProtectedLayer authentication>
            <UpdateEmployeePage/>
          </ProtectedLayer>
        )
      }
    ],
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
