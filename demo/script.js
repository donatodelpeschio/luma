/* ---------------------------------------------------------
 *  LUMA DEMO — Console Emulator + Playground
 * --------------------------------------------------------- */

/* DOM ELEMENTS */
const consoleOutput = document.getElementById("console-output");
const codeBlock = document.getElementById("code-block");

/* INDENTATION FOR GROUPS */
let indentLevel = 0;

/* ---------------------------------------------------------
 *  CONSOLE EMULATOR
 * --------------------------------------------------------- */

function addConsoleLine(level, message) {
    const line = document.createElement("div");
    line.className = `console-line console-${level}`;
    line.style.paddingLeft = `${indentLevel * 16}px`;
    line.textContent = message;

    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function consoleGroup(title) {
    addConsoleLine("log", "▼ " + title);
    indentLevel++;
}

function consoleGroupEnd() {
    indentLevel = Math.max(0, indentLevel - 1);
}

function consoleTimer(label) {
    const start = performance.now();
    return {
        end() {
            const ms = Math.round(performance.now() - start);
            addConsoleLine("info", `${label} — ${ms}ms`);
        }
    };
}

/* PUBLIC API FOR PLAYGROUND */
const demoConsole = {
    log:     msg => addConsoleLine("log", msg),
    success: msg => addConsoleLine("success", msg),
    error:   msg => addConsoleLine("error", msg),
    warn:    msg => addConsoleLine("warn", msg),
    info:    msg => addConsoleLine("info", msg),

    group: consoleGroup,
    groupEnd: consoleGroupEnd,
    timer: consoleTimer
};

/* ---------------------------------------------------------
 *  CODE VIEWER
 * --------------------------------------------------------- */

function showCode(code) {
    codeBlock.textContent = code;
}

/* ---------------------------------------------------------
 *  PLAYGROUND BUTTON HANDLERS
 * --------------------------------------------------------- */

document.querySelectorAll("#playground button").forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.dataset.action;

        switch (action) {

            /* ---------------- LOGS ---------------- */
            case "log":
                luma.log("Hello from Luma!");
                demoConsole.log("Hello from Luma!");
                showCode(`luma.log("Hello from Luma!");`);
                break;

            case "success":
                luma.success("Operazione completata");
                demoConsole.success("Operazione completata");
                showCode(`luma.success("Operazione completata");`);
                break;

            case "error":
                luma.error("Errore critico");
                demoConsole.error("Errore critico");
                showCode(`luma.error("Errore critico");`);
                break;

            case "warn":
                luma.warn("Attenzione!");
                demoConsole.warn("Attenzione!");
                showCode(`luma.warn("Attenzione!");`);
                break;

            case "info":
                luma.info("Informazione utile");
                demoConsole.info("Informazione utile");
                showCode(`luma.info("Informazione utile");`);
                break;

            /* ---------------- TOASTS ---------------- */
            case "toast-success":
                luma.toast.success("Operazione completata");
                demoConsole.success("[Toast] Operazione completata");
                showCode(`luma.toast.success("Operazione completata");`);
                break;

            case "toast-error":
                luma.toast.error("Errore critico");
                demoConsole.error("[Toast] Errore critico");
                showCode(`luma.toast.error("Errore critico");`);
                break;

            case "toast-warn":
                luma.toast.warn("Attenzione!");
                demoConsole.warn("[Toast] Attenzione!");
                showCode(`luma.toast.warn("Attenzione!");`);
                break;

            case "toast-info":
                luma.toast.info("Informazione");
                demoConsole.info("[Toast] Informazione");
                showCode(`luma.toast.info("Informazione");`);
                break;

            /* ---------------- BOX ---------------- */
            case "box":
                luma.box("Questo è un box!");
                demoConsole.log("[Box] Questo è un box!");
                showCode(`luma.box("Questo è un box!");`);
                break;

            /* ---------------- GROUP ---------------- */
            case "group":
                demoConsole.group("Operazione complessa");
                demoConsole.log("Step 1 completato");
                demoConsole.log("Step 2 completato");
                demoConsole.groupEnd();
                showCode(
                    `demoConsole.group("Operazione complessa");
demoConsole.log("Step 1 completato");
demoConsole.log("Step 2 completato");
demoConsole.groupEnd();`
                );
                break;

            /* ---------------- TIMER ---------------- */
            case "timer":
                const t = demoConsole.timer("Operazione");
                setTimeout(() => t.end(), 500);
                showCode(
                    `const t = demoConsole.timer("Operazione");
setTimeout(() => t.end(), 500);`
                );
                break;
        }
    });
});