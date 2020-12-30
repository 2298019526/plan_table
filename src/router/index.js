import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from "@/App.vue";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "",
            component: Layout,
            children: [
                {
                    path: "/",
                    component: () => import(/* webpackChunkName: "index" */ "@/views/index/index.vue")
                }
            ]
        }
    ],
    base: __dirname
})

export default router