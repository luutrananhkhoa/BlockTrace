import {BrowserRouter as Router, Routes ,Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {publicRoutes, privateRoutes} from '~/routes'
import {DefaultLayout} from '~/layouts'
import {Fragment} from 'react'
import AuthMiddleware from '~/layouts/Middlewares/AuthMiddleware/AuthMiddleware';

function App() {
  const auth = useSelector((state) => state.auth)
  // console.log('auth', auth)
  // let isNavigated = <Navigate to="/" replace />
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index)=>{
              const Page = route.component;
              let Layout = DefaultLayout;

              if(route.layout) {
                Layout = route.layout;
              }else if(route.layout===null){
                Layout = Fragment;
              }

              return <Route key={index}
               path={route.path}
               element={
                      <Layout>
                        <Page />
                      </Layout>      
               }/>
          })}
          
        </Routes>
        <Routes>
          <Route path="" element={<AuthMiddleware requestAuth></AuthMiddleware>}>
            {privateRoutes.map((route, index)=>{
                const Page = route.component;
                let Layout = DefaultLayout;

                if(route.layout) {
                  Layout = route.layout;
                }else if(route.layout===null){
                  Layout = Fragment;
                }

                return <Route key={index}
                path={route.path}
                element={
                    <Layout>
                      <Page />
                    </Layout> 
                  }/>
              })}
            </Route>
          </Routes>
      </div>
    </Router>
    
  );
}

export default App;
