import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home.vue");
const Features = () => import("../views/Features.vue");
const QuickStart = () => import("../views/QuickStart.vue");
const Packages = () => import("../views/Packages.vue");
const PackageDetail = () => import("../views/PackageDetail.vue");
const Docs = () => import("../views/Docs.vue");
const Playground = () => import("../views/Playground.vue");
const Configurator = () => import("../views/Configurator.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home, meta: { title: "VTE - Vue Token Engine" } },
    { path: "/features", name: "features", component: Features, meta: { title: "Features - VTE" } },
    { path: "/quickstart", name: "quickstart", component: QuickStart, meta: { title: "快速开始 - VTE" } },
    { path: "/packages", name: "packages", component: Packages, meta: { title: "包结构 - VTE" } },
    { path: "/packages/:name", name: "package-detail", component: PackageDetail, meta: { title: "包详情 - VTE" } },
    { path: "/docs", name: "docs", component: Docs, meta: { title: "API 文档 - VTE" } },
    { path: "/playground", name: "playground", component: Playground, meta: { title: "Playground - VTE" } },
    { path: "/configurator", name: "configurator", component: Configurator, meta: { title: "Token Configurator - VTE" } },
    { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("../views/NotFound.vue"), meta: { title: "页面未找到 - VTE" } },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  document.title = (to.meta.title as string) || "VTE - Vue Token Engine";
});

export default router;
