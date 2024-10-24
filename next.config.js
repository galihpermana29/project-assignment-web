const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const nextTranslate = require("next-translate");

const config = {
    trailingSlash: true,
    images: {
        domains: ["raw.githubusercontent.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
        ],
    },
};

module.exports = withPlugins([[withBundleAnalyzer], [nextTranslate]], config);
