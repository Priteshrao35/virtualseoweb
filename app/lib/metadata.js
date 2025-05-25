const defaultMetadata = {
    title: "Virtualseoweb - Best Web & App Design & Development Company in India",
    description: "Virtualseoweb provides exceptional web and app development services tailored to your needs.",
};

const pageMetadata = {
    "/about": {
        title: "About Us - Virtualseoweb",
        description: "Learn more about Virtualseoweb, the best web and app development company in India.",
    },

     "/blogs": {
        title: "Blogs - Virtualseoweb",
        description: "Learn more about Virtualseoweb, the best web and app development company in India.",
    },

    "/contact": {
        title: "Contact Us - Virtualseoweb",
        description: "Get in touch with Virtualseoweb for web and app development solutions.",
    },

     "/careers": {
        title: "Careers - Virtualseoweb",
        description: "Get in touch with Virtualseoweb for web and app development solutions.",
    },

     "/portfolio": {
        title: "PortFolio - Virtualseoweb",
        description: "Get in touch with Virtualseoweb for web and app development solutions.",
    },

    "/services": {
        title: "Our Services - Virtualseoweb",
        description: "Discover our wide range of web and app development services.",
    },
};

export function getMetadata(route) {
    return pageMetadata[route] || defaultMetadata;
}