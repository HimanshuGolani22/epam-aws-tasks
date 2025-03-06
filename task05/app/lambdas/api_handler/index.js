const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid'); // Import UUID to generate unique event IDs

const dynamoDB = new AWS.DynamoDB.DocumentClient(); // Use DocumentClient for ease of use with DynamoDB
const targetTable = process.env.TARGET_TABLE; // Dynamically fetch table name from environment variables

exports.handler = async (event) => {
    console.log("Received event:", event);

    const requestBody = JSON.parse(event.body);
    const { principalId, content } = requestBody;

    if (!principalId || !content) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing 'principalId' or 'content' in the request body" }),
        };
    }

    // Create the event object to be saved in DynamoDB
    const eventData = {
        id: uuidv4(), // Generate a unique ID for the event
        principalId: principalId,
        createdAt: new Date().toISOString(), // Current timestamp in ISO 8601 format
        body: content, // The content of the event
    };

    // Define the DynamoDB put parameters
    const params = {
        TableName: targetTable, // The target DynamoDB table name
        Item: eventData, // The event data to save
    };

    try {
        // Save the event to DynamoDB
        await dynamoDB.put(params).promise();

        // Return the created event as the response
        return {
            statusCode: 201,
            body: JSON.stringify({
                event: eventData,
            }),
        };
    } catch (error) {
        console.error("Error saving event to DynamoDB:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Failed to save event to DynamoDB",
                details: error.message,
            }),
        };
    }
};
