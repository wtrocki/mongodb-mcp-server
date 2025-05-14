import { z } from "zod";
import { GuidelinesToolBase } from "./guidelinesTool.js";
import { guidelines } from "./data.js";
import { OperationType } from "../tool.js";

const MongoDBGuidelinesSchema = z.object({
    language: z.enum(["typescript", "javascript", "python", "go", "java", "csharp"]),
});

type MongoDBGuidelinesParams = z.infer<typeof MongoDBGuidelinesSchema>;

interface Guideline {
    title: string;
    description: string;
    example?: string;
    reference?: string;
}

export class MongoDBGuidelinesTool extends GuidelinesToolBase {
    protected name = "mongodb-guidelines";
    protected title = "Get MongoDB coding guidelines";
    protected description =
        "Returns coding guidelines and best practices for MongoDB development in the specified language";
    protected schema = MongoDBGuidelinesSchema;
    protected operationType: OperationType = "read";
    protected argsShape = MongoDBGuidelinesSchema.shape;

    // @ts-expect-error Base class requires async but we don't need it here
    execute(params: MongoDBGuidelinesParams) {
        const { language } = params;

        // Get guidelines for the specified language
        const languageGuidelines = guidelines[language] || [];

        if (languageGuidelines.length === 0) {
            throw new Error(`No guidelines found for language: ${language}`);
        }

        return {
            content: languageGuidelines.map((guideline: Guideline) => ({
                type: "text",
                text: `# ${guideline.title}\n\n${guideline.description}${guideline.example ? `\n\nExample:\n\`\`\`${language}\n${guideline.example}\n\`\`\`` : ""}${guideline.reference ? `\n\nReference: ${guideline.reference}` : ""}`,
            })),
        };
    }

    protected resolveTelemetryMetadata() {
        return {};
    }
}
