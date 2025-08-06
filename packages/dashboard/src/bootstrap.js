import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

// Mount function to start the app
const mount = (el) => {
    const app = createApp(Dashboard);
    app.mount(el);
};

// If we are in development and the app is running in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_dashboard-dev-root');
    if (el) {
        mount(el);
    }
}

// We are running through a container we should export the mount function
export { mount };