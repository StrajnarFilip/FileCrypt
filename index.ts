import { AesQuickFileDecrypt, AesQuickFileEncrypt, overKillScrypt } from "nodepromiseapi";
import { existsSync } from "fs"
import prompt from "prompt"
import { prompt as schemaOverride } from "./override"

function Main(decryptOrEncryptString: string, filePathInput: string | undefined, filePathOutput: string | undefined) {
    if (!filePathInput || !filePathOutput || !existsSync(filePathInput) || existsSync(filePathOutput)) {
        console.log("Invalid file path")
        return
    }
    if (decryptOrEncryptString.toLowerCase() === "encrypt" || decryptOrEncryptString.toLowerCase() === "decrypt") {
        prompt.start()
        const schema: schemaOverride.Schema = {
            properties: {
                password: {
                    hidden: true
                }
            }
        };
        prompt.get(schema, function (err, result) {
            const password = result.password as string
            overKillScrypt(password, "intentionally static string", 32)
                .then(aesKey => {
                    if (decryptOrEncryptString.toLowerCase() === "encrypt") {
                        AesQuickFileEncrypt(aesKey, filePathInput, filePathOutput)
                    } else {
                        if (decryptOrEncryptString.toLowerCase() === "decrypt") {
                            AesQuickFileDecrypt(aesKey, filePathInput, filePathOutput)
                        }
                    }
                })
        })

    } else {
        console.log("The only two viable options are [encrypt] or [decrypt]")
    }
}

Main(process.argv[2], process.argv[3], process.argv[4])