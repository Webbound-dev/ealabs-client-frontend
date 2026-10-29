import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import TestDetail from "../pages/TestDetail";
import MainLayout from "../components/layout/MainLayout";
import TestMenu from "../pages/TestMenu";
import ContactUs from "../pages/ContactUs";
import PackageTestDetail from "../pages/PackageTestDetail";
import AboutUs from "../pages/AboutUs";
import Resources from "../pages/Resources";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions";
import BlogPage from "../pages/Blog";
import Gallery from "../pages/Gallery";
import ShippingPolicy from "../pages/UserPolicy";
import RefundPolicy from "../pages/Refund&CancellationPolicy";
import BlogDetail from "../pages/BlogDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/test-detail/:name", element: <TestDetail /> },
            { path: "/test-menu", element: <TestMenu /> },
            { path: "/contactus", element: <ContactUs /> },
            { path: "/packagetestdetail/:name", element: <PackageTestDetail /> },
            { path: "/aboutus", element: <AboutUs /> },
            { path: "/resources", element: <Resources /> },
            { path: "/privacy-policy", element: <PrivacyPolicy /> },
            { path: "/shipping-policy", element: <ShippingPolicy /> },
            { path: "/terms-conditions", element: <TermsAndConditions /> },
            { path: "/blog", element: <BlogPage /> },
            { path: "/gallery", element: <Gallery /> },
            { path: "/refund-cancellation-policy", element: <RefundPolicy /> },
            { path: "/blog/blog-detail/:slug", element: <BlogDetail /> },
        ],
    },

]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;