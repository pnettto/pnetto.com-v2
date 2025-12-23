async function runCode(button) {
    const codeRunnerEl = button.closest(".code-runner");
    const outputEl = codeRunnerEl.querySelector(".output");
    const codeEl = codeRunnerEl.querySelector("code");

    const languageId = codeRunnerEl.dataset.langId;
    const content = codeEl.textContent;
    const base64Code = btoa(content);
    const originalText = button.innerText;

    // Update UI State
    button.disabled = true;
    button.innerHTML = `<span class="spinner"></span>Running...`;
    outputEl.innerText = "";

    try {
        const response = await fetch(
            "http://34.56.222.115/submissions?base64_encoded=true&wait=true",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source_code: base64Code,
                    language_id: languageId,
                }),
            },
        );

        const result = await response.json();
        const output = result.stdout || result.stderr ||
            result.compile_output || "Program executed with no output.";
        outputEl.innerText = atob(output);
    } catch (err) {
        outputEl.style.color = "#f44747";
        outputEl.innerText = `Error: ${err}`;
    } finally {
        button.disabled = false;
        button.innerText = originalText;
    }
}
