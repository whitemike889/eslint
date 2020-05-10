/**
 * @fileoverview Defines a schema for configs.
 * @author Sylvan Mably
 */

"use strict";

const baseConfigProperties = {
    $schema: { type: "string" },
    env: { type: "object" },
    extends: {
        oneOf: [
            { type: "string" },
            {
                type: "array",
                items: {
                    oneOf: [
                        { type: "string" },
                        { $ref: "#/definitions/objectConfig" }
                    ]
                },
                additionalItems: false
            }
        ]
    },
    globals: { type: "object" },
    overrides: {
        type: "array",
        items: { $ref: "#/definitions/overrideConfig" },
        additionalItems: false
    },
    parser: { type: ["string", "object", "null"] },
    parserOptions: { type: "object" },
    plugins: {
        oneOf: [
            {
                type: "array",
                items: { type: "string" },
                additionalItems: false
            },
            {
                type: "object",
                additionalProperties: { type: ["string", "object"] }
            }
        ]
    },
    processor: { type: ["string", "object"] },
    rules: { type: "object" },
    settings: { type: "object" },
    noInlineConfig: { type: "boolean" },
    reportUnusedDisableDirectives: { type: "boolean" },

    ecmaFeatures: { type: "object" } // deprecated; logs a warning when used
};

const configSchema = {
    definitions: {
        stringOrStrings: {
            oneOf: [
                { type: "string" },
                {
                    type: "array",
                    items: { type: "string" },
                    additionalItems: false
                }
            ]
        },
        stringOrStringsRequired: {
            oneOf: [
                { type: "string" },
                {
                    type: "array",
                    items: { type: "string" },
                    additionalItems: false,
                    minItems: 1
                }
            ]
        },

        // Config at top-level.
        objectConfig: {
            type: "object",
            properties: {
                root: { type: "boolean" },
                ignorePatterns: { $ref: "#/definitions/stringOrStrings" },
                ...baseConfigProperties
            },
            additionalProperties: false
        },

        // Config in `overrides`.
        overrideConfig: {
            type: "object",
            properties: {
                excludedFiles: { $ref: "#/definitions/stringOrStrings" },
                files: { $ref: "#/definitions/stringOrStringsRequired" },
                ...baseConfigProperties
            },
            required: ["files"],
            additionalProperties: false
        }
    },

    $ref: "#/definitions/objectConfig"
};

module.exports = configSchema;
