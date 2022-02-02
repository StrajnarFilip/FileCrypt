"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodepromiseapi_1 = require("nodepromiseapi");
var fs_1 = require("fs");
var prompt_1 = __importDefault(require("prompt"));
function Main(decryptOrEncryptString, filePathInput, filePathOutput) {
    if (!filePathInput || !filePathOutput || !(0, fs_1.existsSync)(filePathInput) || (0, fs_1.existsSync)(filePathOutput)) {
        console.log("Invalid file path");
        return;
    }
    if (decryptOrEncryptString.toLowerCase() === "encrypt" || decryptOrEncryptString.toLowerCase() === "decrypt") {
        prompt_1.default.start();
        var schema = {
            properties: {
                password: {
                    hidden: true
                }
            }
        };
        prompt_1.default.get(schema, function (err, result) {
            var password = result.password;
            (0, nodepromiseapi_1.overKillScrypt)(password, "intentionally static string", 32).then(function (aesKey) {
                if (decryptOrEncryptString.toLowerCase() === "encrypt") {
                    (0, nodepromiseapi_1.AesQuickFileEncrypt)(aesKey, filePathInput, filePathOutput);
                }
                else {
                    if (decryptOrEncryptString.toLowerCase() === "decrypt") {
                        (0, nodepromiseapi_1.AesQuickFileDecrypt)(aesKey, filePathInput, filePathOutput);
                    }
                }
            });
        });
    }
    else {
        console.log("The only two viable options are [encrypt] or [decrypt]");
    }
}
Main(process.argv[2], process.argv[3], process.argv[4]);
