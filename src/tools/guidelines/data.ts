interface Guideline {
    title: string;
    description: string;
    example?: string;
    reference?: string;
}

type LanguageGuidelines = {
    [key in "typescript" | "javascript" | "python" | "go" | "java" | "csharp"]: Guideline[];
};

export const guidelines: LanguageGuidelines = {
    typescript: [
        {
            title: "Use TypeScript Types for MongoDB Documents",
            description:
                "Define interfaces or types for your MongoDB documents to ensure type safety and better IDE support.",
            example: `interface User {
    _id: ObjectId;
    name: string;
    email: string;
    createdAt: Date;
}`,
            reference: "https://www.mongodb.com/docs/drivers/node/current/fundamentals/typescript/",
        },
        {
            title: "Async/Await Pattern",
            description:
                "Always use async/await when working with MongoDB operations for better readability and error handling.",
            example: `async function findUser(id: string): Promise<User | null> {
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user;
}`,
        },
    ],
    javascript: [
        {
            title: "Use Promises",
            description: "Always use Promises or async/await when working with MongoDB operations.",
            example: `async function insertDocument(doc) {
    try {
        const result = await collection.insertOne(doc);
        return result;
    } catch (err) {
        console.error('Failed to insert document:', err);
        throw err;
    }
}`,
        },
    ],
    python: [
        {
            title: "Use PyMongo Type Hints",
            description: "Leverage Python type hints with PyMongo for better code documentation and IDE support.",
            example: `from typing import Optional
from pymongo.collection import Collection

def find_user(collection: Collection, user_id: str) -> Optional[dict]:
    return collection.find_one({"_id": ObjectId(user_id)})`,
        },
    ],
    go: [
        {
            title: "Use Strong Typing",
            description: "Define structs that match your MongoDB document structure for type safety.",
            example: `type User struct {
    ID        primitive.ObjectID \`bson:"_id"\`
    Name      string            \`bson:"name"\`
    Email     string            \`bson:"email"\`
    CreatedAt time.Time         \`bson:"createdAt"\`
}`,
        },
    ],
    java: [
        {
            title: "Use POJOs",
            description: "Create Plain Old Java Objects (POJOs) that represent your MongoDB documents.",
            example: `public class User {
    private ObjectId id;
    private String name;
    private String email;
    private Date createdAt;
    // Getters and setters
}`,
        },
    ],
    csharp: [
        {
            title: "Use BsonDocument Attributes",
            description: "Decorate your C# classes with BsonDocument attributes for proper MongoDB serialization.",
            example: `public class User
{
    [BsonId]
    public ObjectId Id { get; set; }
    
    [BsonElement("name")]
    public string Name { get; set; }
}`,
        },
    ],
};
