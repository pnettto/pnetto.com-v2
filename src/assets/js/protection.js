(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const passwordWall = document.getElementById("password-wall");
        const protectedContent = document.getElementById("protected-content");
        const passwordInput = document.getElementById("password-input");
        const unlockButton = document.getElementById("unlock-button");

        const storageKey = "siteKey";
        const PBKDF2_ITERATIONS = 150_000;
        const KEY_LENGTH = 256;

        const hexToBuffer = (hex) =>
            new Uint8Array(
                hex.match(/.{1,2}/g).map((b) => parseInt(b, 16)),
            );

        const bufferToHex = (buffer) =>
            Array.from(new Uint8Array(buffer))
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("");

        async function getVaultKey(
            password,
            saltHex,
            iterations = PBKDF2_ITERATIONS,
        ) {
            const encoder = new TextEncoder();
            const passwordKey = await crypto.subtle.importKey(
                "raw",
                encoder.encode(password),
                "PBKDF2",
                false,
                ["deriveKey"],
            );

            return crypto.subtle.deriveKey(
                {
                    name: "PBKDF2",
                    salt: hexToBuffer(saltHex),
                    iterations,
                    hash: "SHA-256",
                },
                passwordKey,
                { name: "AES-GCM", length: KEY_LENGTH },
                true,
                ["decrypt"],
            );
        }

        async function decryptContent(encryptedJson, cryptoKey) {
            try {
                const { iv, tag, data } = JSON.parse(encryptedJson);

                const dataBuffer = hexToBuffer(data);
                const tagBuffer = hexToBuffer(tag);

                const combined = new Uint8Array(
                    dataBuffer.length + tagBuffer.length,
                );
                combined.set(dataBuffer);
                combined.set(tagBuffer, dataBuffer.length);

                const decrypted = await crypto.subtle.decrypt(
                    {
                        name: "AES-GCM",
                        iv: hexToBuffer(iv),
                        tagLength: 128,
                    },
                    cryptoKey,
                    combined,
                );

                return new TextDecoder().decode(decrypted);
            } catch {
                return null;
            }
        }

        async function unlockWithPassword(password) {
            if (!password) return false;

            const encryptedBase64 = protectedContent.dataset.encrypted;
            const encryptedJsonStr = atob(encryptedBase64);
            const payload = JSON.parse(encryptedJsonStr);

            const saltHex = payload.salt;
            const iterations = payload.iterations || PBKDF2_ITERATIONS;

            const cryptoKey = await getVaultKey(password, saltHex, iterations);
            const decryptedHTML = await decryptContent(
                encryptedJsonStr,
                cryptoKey,
            );

            if (!decryptedHTML) return false;

            protectedContent.innerHTML = decryptedHTML;
            passwordWall.style.display = "none";
            protectedContent.style.display = "block";
            protectedContent.style.visibility = "visible";
            protectedContent.classList.add("fade-in");

            // Export the derived key and store in localStorage
            const rawKey = await crypto.subtle.exportKey("raw", cryptoKey);
            localStorage.setItem(storageKey, bufferToHex(rawKey));

            return true;
        }

        async function unlockWithStoredKey(rawHexKey) {
            try {
                const encryptedBase64 = protectedContent.dataset.encrypted;
                const encryptedJsonStr = atob(encryptedBase64);

                const cryptoKey = await crypto.subtle.importKey(
                    "raw",
                    hexToBuffer(rawHexKey),
                    "AES-GCM",
                    false,
                    ["decrypt"],
                );

                const decryptedHTML = await decryptContent(
                    encryptedJsonStr,
                    cryptoKey,
                );
                if (!decryptedHTML) return false;

                protectedContent.innerHTML = decryptedHTML;
                passwordWall.style.display = "none";
                protectedContent.style.display = "block";
                protectedContent.style.visibility = "visible";
                protectedContent.classList.add("fade-in");

                return true;
            } catch {
                return false;
            }
        }

        async function checkSavedKey() {
            const storedHexKey = localStorage.getItem(storageKey);
            if (storedHexKey) {
                const success = await unlockWithStoredKey(storedHexKey);
                if (!success) {
                    localStorage.removeItem(storageKey);
                    passwordWall.classList.add("is-visible");
                }
            } else {
                passwordWall.classList.add("is-visible");
            }
        }

        async function handleUnlock() {
            const password = passwordInput.value;
            if (!password) return;

            unlockButton.disabled = true;
            unlockButton.textContent = "Unlocking...";

            const success = await unlockWithPassword(password);

            if (!success) {
                passwordInput.focus();
                unlockButton.disabled = false;
                unlockButton.textContent = "Unlock";
            }
        }

        if (passwordWall) {
            checkSavedKey();
            unlockButton.addEventListener("click", handleUnlock);
            passwordInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") handleUnlock();
            });
        }
    });
})();
