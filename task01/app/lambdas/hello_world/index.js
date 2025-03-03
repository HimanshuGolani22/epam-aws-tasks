exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from Lambda" })  
    };

    return response;
};
// exports.handler = async (event) => {
//     const path = event.rawPath || event.path || "/";
//     const method = event.requestContext?.http?.method || event.httpMethod || "UNKNOWN";
//     if (path === "/hello" && method === "GET") {
//         return {
//             statusCode: 200,
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ statusCode: 200, message: "Hello from Lambda" }),

//         };

//     }
//     return {
//         statusCode: 400, headers: { 
//             "Content-Type": "application/json" 
//         },
//         body: JSON.stringify({
//             statusCode: 400,
//         }),
//     };
// };
