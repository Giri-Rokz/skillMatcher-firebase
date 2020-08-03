import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/components/home.vue";
import Store from "../store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  }, 
  {
    path: "/createProfile",
    name: "CreateProfile",
    component: () =>
      import(/* webpackChunkName: "CreateProfile" */ "@/components/createProfile.vue")
  },
  {
    path: "/matches",
    name: "Matches",
    component: () =>
      import(/* webpackChunkName: "Matches" */ "@/components/matches.vue")
  },{
    path: "/viewprofile/:searchedUser",
    name: "ViewProfile",
    component: () =>
      import(/* webpackChunkName: "ViewProfile" */ "@/components/viewprofile.vue"),
    props: true  
  },{
    path: "/viewprofile",
    name: "ViewProfile",
    component: () =>
      import(/* webpackChunkName: "ViewProfile" */ "@/components/viewprofile.vue")    
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//authGuard
router.beforeEach((to, from, next) => {
  try {
    const loginState = Store.getters["storeData/isLoggedIn"];
    if (to.name !== 'Home' && !loginState) next({ name: 'Home' })
    else next()
  }catch(err) {
    console.log(err);
  }
})

export default router;
