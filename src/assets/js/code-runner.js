async function runCode(button) {
    const codeRunnerEl = button.closest(".code-runner");
    const outputEl = codeRunnerEl.querySelector(".code-output");
    const codeEl = codeRunnerEl.querySelector("code");

    const languageVersion = codeRunnerEl.dataset.languageVersion;
    const languageName = codeRunnerEl.dataset.languageName;
    const code = codeEl.textContent;
    const originalText = button.innerText;

    // Update UI State
    button.disabled = true;
    button.innerHTML = `<span class="code-spinner"></span>Running...`;
    outputEl.innerText = "";

    try {
        const response = await fetch(
            `https://piston.pnetto.com/api/v2/execute`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: languageName,
                    version: languageVersion,
                    files: [{ content: code }],
                }),
            },
        );

        const result = await response.json();
        const output = result.run.output || "Program executed with no output.";

        outputEl.innerText = output;
        outputEl.classList.add("is-loaded");
    } catch (err) {
        outputEl.style.color = "#f44747";
        outputEl.innerText = `Error: ${err}`;
    } finally {
        button.disabled = false;
        button.innerText = originalText;
    }
}
