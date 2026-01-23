import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Royals HQ API",
            version: "1.0.0",
            description: "API for Royals HQ",
        },
        tags: [{
            name: "League",
        },
        {
            name: "Subscription",
        },
        {
            name: "Debug",
        }],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-api-key",
                },
            },
        },
        servers: [
            {
                url: process.env.NODE_ENV === "development"
                    ? "http://localhost:3000"
                    : "https://royals-hq.tylerlatshaw.com",
            },
        ],
    },
    apis: ["./src/app/api/**/route.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
