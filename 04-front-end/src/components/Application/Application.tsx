import React from 'react';
import { Container } from 'react-bootstrap';
import './Application.sass';
import UserLoginPage from '../User/UserLoginPage/UserLoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactPage from '../Pages/ContactPage/ContactPage';
import MyPeriodsPage from '../User/MyPeriodsPage/MyPeriodsPage';
import RulesAndGuidesPage from '../User/RulesAndGuidesPage/RulesAndGuidesPage';
import UserPeriodListPage from '../User/UserPeriodListPage/UserPeriodListPage';
import UserRegisterPage from '../User/UserRegisterPage/UserRegisterPage';
import AdminLoginPage from '../Administrator/AdminLoginPage/AdminLoginPage';
import AdminDashboardPage from '../Administrator/AdminDashboardPage/AdminDashboardPage';
import AdminPeriodListPage from '../Administrator/AdminPeriodListPage/AdminPeriodListPage';
import UserListPage from '../Administrator/UserListPage/UserListPage';
import AdminEditContactPage from '../Administrator/AdminEditContactPage/AdminEditContactPage';
import AdminEditRulesAndGuidesPage from '../Administrator/AdminEditRulesAndGuidesPage/AdminEditRulesAndGuidesPage';
import Menu from '../Menu/Menu';
import AdminPeriodPage from '../Administrator/AdminPeriodPage/AdminPeriodPage';
import { Provider } from 'react-redux';
import AuthStore from '../../stores/AuthStore';
import AdminListPage from '../Administrator/AdminListPage/AdminListPage';

function Application() {
  return (

    <Provider store={AuthStore}>
      <Container className="mt-4">

        

        <BrowserRouter>
            <Menu /> 
            <Routes>
              <Route path="/" element={ <UserLoginPage /> }></Route>
              <Route path="/contact" element={ <ContactPage /> }></Route>

              <Route path="/auth/user/login" element={ <UserLoginPage /> }></Route>
              <Route path="/auth/user/register" element={ <UserRegisterPage /> }></Route>
              <Route path="/my-periods" element={ <MyPeriodsPage /> }></Route>
              <Route path="/rules-and-guides" element={ <RulesAndGuidesPage /> }></Route>
              <Route path="/browse-periods" element={ <UserPeriodListPage /> }></Route>

              <Route path="/auth/admin/login" element={ <AdminLoginPage /> }></Route>
              <Route path="/admin/dashboard" element={ <AdminDashboardPage /> }></Route>
              <Route path="/admin/admin-list" element={ <AdminListPage /> }></Route>
              <Route path="/admin/periods" element={ <AdminPeriodListPage /> }></Route>
              <Route path="/admin/users" element={ <UserListPage /> }></Route>
              <Route path="/admin/edit-contact" element={ <AdminEditContactPage /> }></Route>
              <Route path="/admin/edit-rules-and-guides" element={ <AdminEditRulesAndGuidesPage /> }></Route>
              <Route path="/admin/period/:id" element={ <AdminPeriodPage /> }></Route>
            </Routes>
        </BrowserRouter>
      </Container>
    </Provider>
  );
}

export default Application;
