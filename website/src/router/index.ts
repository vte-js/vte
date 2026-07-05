import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Features from "../views/Features.vue";
import QuickStart from "../views/QuickStart.vue";
import Packages from "../views/Packages.vue";
import PackageDetail from "../views/PackageDetail.vue";
import Docs from "../views/Docs.vue";
import Playground from "../views/Playground.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/features", name: "features", component: Features },
    { path: "/quickstart", name: "quickstart", component: QuickStart },
    { path: "/packages", name: "packages", component: Packages },
    { path: "/packages/:name", name: "package-detail", component: PackageDetail },
    { path: "/docs", name: "docs", component: Docs },
    { path: "/playground", name: "playground", component: Playground },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
