module.exports = {
    routes: [
        {
            path: "/echo",
            method: "POST",
            timeoutMs: 5000, // currently unused
            handler: async (payload) => {
                console.log("[ipm-module-template] POST /echo - Received payload:");
                console.log(JSON.stringify(payload, null, 2));
                const queryParams = payload.query;
                const body = payload.body;
                return {
                    echoParams: queryParams,
                    echoBody: body
                }
            }
        },
        {
            path: "/echo",
            method: "GET",
            timeoutMs: 5000, // currently unused
            handler: async (payload) => {
                console.log("[ipm-module-template] GET /echo - Received payload:");
                console.log(JSON.stringify(payload, null, 2));
                const queryParams = payload.query;
                return {
                    echoParams: queryParams
                }
            }
        }
    ]
};