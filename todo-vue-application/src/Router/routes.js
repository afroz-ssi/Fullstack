import { createWebHistory, createRouter } from "vue-router";

import HomeComponent from '../components/Pages/HomeComponent.vue'
import SignupComponent from '../components/Pages/SignupComponent.vue'
import LoginComponent from '../components/Pages/LoginComponent.vue'
// import LogoutComponent from '../components/Pages/LogoutComponent.vue'

import CreatePost from '../components/Pages/CreatePost.vue'

import EditComponent from '../components/Pages/EditPostComponent.vue'
import PageNotFound from '../components/Pages/PageNotFound.vue'






const routes = [
  {
    name: "LoginComponent",
    path: "/",
    component:LoginComponent,
  },
  {
    name: "SignupComponent",
    path: "/signup",
    component:SignupComponent,
  },
  
  {
    name: "Logout",
    path: "/user/logout",
    // component:LogoutComponent,
  },
  
  {
    name: "CreatePost",
    path:'/user/create',
    component:CreatePost,
  },
  {
    name: "EditComponent",
    path:'/edit/:id?',
    component:EditComponent,
  },
  {
    name: "Home",
    path: "/user/homepage",
    // path: "/home/:id?",
    component:HomeComponent,
  },
  {
    name: "PageNotFound",
    path: "/:pathMatch(.*)*",
    component:PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
