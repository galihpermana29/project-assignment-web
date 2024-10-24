module.exports = {
    locales: ["id", "en"],
    defaultLocale: "id",
    localeDetection: false,
    pages: {
        "*": ["common", "pokemon"],
        "/": ["home"],
        "/pokemon": ["pokemon"],
        "/pokemon/detail/:id": ["pokemon"],
    },
};
