/* CONFIG */
const config = {
    theme: "light",
    emoji: true,
    timestamp: false,
    uppercaseLevel: true
};

/* THEMES */
const themes = {
    light: {
        success: { bg: "#4caf50", color: "#fff" },
        error:   { bg: "#f44336", color: "#fff" },
        warn:    { bg: "#ff9800", color: "#000" },
        info:    { bg: "#2196f3", color: "#fff" },
        log:     { bg: "#9e9e9e", color: "#fff" }
    },
    dark: {
        success: { bg: "#2e7d32", color: "#fff" },
        error:   { bg: "#c62828", color: "#fff" },
        warn:    { bg: "#ef6c00", color: "#000" },
        info:    { bg: "#1565c0", color: "#fff" },
        log:     { bg: "#616161", color: "#fff" }
    }
};

/* EMOJI */
const emojiMap = {
    success: "✔️",
    error:   "❌",
    warn:    "⚠️",
    info:    "ℹ️",
    log:     "•"
};

/* UTILS */
function timestamp() {
    if (!config.timestamp) return "";
    return new Date().toLocaleTimeString() + " ";
}

function getTheme(level) {
    const themeName = config.theme === "auto"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : config.theme;

    return themes[themeName][level];
}

function styleBadge(level) {
    const t = getTheme(level);
    return `background:${t.bg};color:${t.color};padding:2px 6px;border-radius:4px;font-weight:bold;`;
}

/* PRINT */
function print(level, message, options = {}) {
    const useEmoji = options.emoji ?? config.emoji;
    const emoji = useEmoji ? emojiMap[level] + " " : "";
    const label = config.uppercaseLevel ? level.toUpperCase() : level;

    const css = styleBadge(level);

    console.log(
        `%c ${label} %c ${emoji}${message}`,
        css,
        "padding:2px 4px;"
    );
}

/* BOX */
function box(message, options = {}) {
    const border = options.border || "single";
    const color = options.color || "#2196f3";

    const chars = {
        single: { tl: "┌", tr: "┐", bl: "└", br: "┘", h: "─", v: "│" },
        double: { tl: "╔", tr: "╗", bl: "╚", br: "╝", h: "═", v: "║" },
        round:  { tl: "╭", tr: "╮", bl: "╰", br: "╯", h: "─", v: "│" }
    }[border];

    const line = chars.h.repeat(message.length + 2);

    console.log(
        `%c${chars.tl}${line}${chars.tr}\n${chars.v} ${message} ${chars.v}\n${chars.bl}${line}${chars.br}`,
        `color:${color};font-weight:bold;`
    );
}

/* GROUP */
function group(title, callback, options = {}) {
    const level = options.level || "log";
    const emoji = config.emoji ? emojiMap[level] + " " : "";

    console.group(`${emoji}${title}`);
    callback();
    console.groupEnd();
}

/* TIMER */
function timer(label) {
    const start = performance.now();
    return {
        end() {
            const ms = Math.round(performance.now() - start);
            print("info", `${label} — ${ms}ms`);
        }
    };
}



/* ---------------------------------------------------------
 *  TOAST SYSTEM (Luma Premium)
 * --------------------------------------------------------- */

let toastContainer = null;
let toastQueue = [];
let activeToasts = 0;
const MAX_ACTIVE = 4;

function ensureToastContainer(position = "top-right") {
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.style.position = "fixed";
        toastContainer.style.zIndex = "99999";
        toastContainer.style.display = "flex";
        toastContainer.style.flexDirection = "column";
        toastContainer.style.gap = "10px";
        toastContainer.style.pointerEvents = "none";
        setToastPosition(position);
        document.body.appendChild(toastContainer);
    }
}

function setToastPosition(position) {
    const pos = position.split("-");
    toastContainer.style.top = pos.includes("top") ? "16px" : "";
    toastContainer.style.bottom = pos.includes("bottom") ? "16px" : "";
    toastContainer.style.left = pos.includes("left") ? "16px" : "";
    toastContainer.style.right = pos.includes("right") ? "16px" : "";
}

function enqueueToast(level, message, options) {
    toastQueue.push({ level, message, options });
    processQueue();
}

function processQueue() {
    if (activeToasts >= MAX_ACTIVE) return;
    if (toastQueue.length === 0) return;

    const { level, message, options } = toastQueue.shift();
    showToast(level, message, options);
}

function showToast(level, message, options = {}) {
    const duration = options.duration ?? 4000;
    const position = options.position ?? "top-right";
    const useEmoji = options.emoji ?? config.emoji;

    ensureToastContainer(position);

    const theme = getTheme(level);
    const emoji = useEmoji ? emojiMap[level] + " " : "";

    const toast = document.createElement("div");
    toast.style.background = theme.bg;
    toast.style.color = theme.color;
    toast.style.padding = "12px 16px";
    toast.style.borderRadius = "8px";
    toast.style.fontFamily = "system-ui, sans-serif";
    toast.style.fontSize = "14px";
    toast.style.fontWeight = "500";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
    toast.style.transition = "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
    toast.style.pointerEvents = "auto";
    toast.style.position = "relative";
    toast.style.overflow = "hidden";

    toast.textContent = emoji + message;

    /* Progress bar */
    const bar = document.createElement("div");
    bar.style.position = "absolute";
    bar.style.bottom = "0";
    bar.style.left = "0";
    bar.style.height = "3px";
    bar.style.width = "100%";
    bar.style.background = theme.color;
    bar.style.opacity = "0.4";
    bar.style.transformOrigin = "left";
    bar.style.animation = `luma-progress ${duration}ms linear forwards`;
    toast.appendChild(bar);

    /* Pause on hover */
    toast.addEventListener("mouseenter", () => {
        bar.style.animationPlayState = "paused";
    });
    toast.addEventListener("mouseleave", () => {
        bar.style.animationPlayState = "running";
    });

    /* Keyframes injected once */
    if (!document.getElementById("luma-toast-style")) {
        const style = document.createElement("style");
        style.id = "luma-toast-style";
        style.textContent = `
            @keyframes luma-progress {
                from { transform: scaleX(1); }
                to   { transform: scaleX(0); }
            }
        `;
        document.head.appendChild(style);
    }

    toastContainer.appendChild(toast);
    activeToasts++;

    /* Animate in */
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    /* Animate out */
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-6px)";
        setTimeout(() => {
            toast.remove();
            activeToasts--;
            processQueue();
        }, 350);
    }, duration);
}


/* PUBLIC API */
const luma = {
    config(options) {
        Object.assign(config, options);
    },

    theme(name, themeObject) {
        themes[name] = themeObject;
    },

    log:     (msg, opt) => print("log", msg, opt),
    success: (msg, opt) => print("success", msg, opt),
    error:   (msg, opt) => print("error", msg, opt),
    warn:    (msg, opt) => print("warn", msg, opt),
    info:    (msg, opt) => print("info", msg, opt),

    box,
    group,
    timer,
    toast: {
        success: (msg, opt) => enqueueToast("success", msg, opt),
        error:   (msg, opt) => enqueueToast("error", msg, opt),
        warn:    (msg, opt) => enqueueToast("warn", msg, opt),
        info:    (msg, opt) => enqueueToast("info", msg, opt),
        log:     (msg, opt) => enqueueToast("log", msg, opt)
    }

};