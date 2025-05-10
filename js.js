// ==== GLOBAL STATE ====
let progress = 0;
const unlockedBadges = [];

// ==== DOM ELEMENTS ====
const notifier = document.getElementById('notifier');
const notifierp = document.getElementById('notifierp');
const header = document.querySelector('header');
const headerh1 = document.getElementById('headerh1');
const headerp = document.getElementById('headerp');
const containers = document.querySelectorAll('.container');
const footer = document.querySelector('footer');
const popup = document.getElementById('achievementPopup');
const rollHintBtn = document.getElementById('rollHintBtn');
const hintDisplay = document.getElementById('hintDisplay');

// ==== NOTIFIER FUNCTIONS ====
function setNotifier(message, subMessage, bg = 'black', color = 'lime') {
    notifier.innerHTML = message;
    notifierp.innerHTML = subMessage;
    notifier.style.backgroundColor = bg;
    notifier.style.color = color;
    notifierp.style.backgroundColor = bg;
    notifierp.style.color = color;
    setTimeout(() => {
        notifier.innerHTML = '';
        notifierp.innerHTML = '';
    }, 5000);
}

// ==== CONTAINER HOVER LOGIC ====
let messageIndex = -1;
const messages = [
    "Bruh...", "Why are you still here?", "You must be really bored...",
    "Seriously, find something better to do.", "This is getting ridiculous.",
    "Are you just going to stare at this?", "I mean, I appreciate the attention, but come on.",
    "You could be doing literally anything else.", "Like, I don't know, watching paint dry?",
    "Or counting the number of tiles on your floor?", "Or maybe even staring at a wall?",
    "I mean, I get it, I'm pretty entertaining.", "But this is just sad.",
    "You know you can close this tab, right?", "Or maybe open a new one?",
    "I mean, I won't judge you if you do.", "But if you stay, I guess I can keep you company.",
    "Just don't expect too much from me.", "I'm just a simple website, after all.",
    "But hey, if you're bored, I'm here for you.", "So, what do you want to talk about?",
    "I mean, I can talk about anything.", "Like, I don't know, the weather?",
    "Or maybe your favorite color?", "Bruv listen, Don't expect me to show you anything interesting.",
    "I mean, I can try, but I'm not making any promises.", "But if you want to stick around, I'm all ears.",
    "Just don't expect too much from me.", "I mean, I'm just a simple website.",
    "You know what? IM DONE WITH THIS.", "...", "I literally said I was done.",
    "But here I am, looking at you hovering this damn box.",
];

containers.forEach(container => {
    const content = container.querySelector('.content');
    const originalContent = content.innerHTML;
    let hoverTimer;

    container.addEventListener('mouseenter', () => {
        hoverTimer = setTimeout(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            content.innerHTML = messages[messageIndex];
            if (messageIndex === 32) {
                setNotifier('WHY ARE YOU STILL HERE?', 'BRUH...');
                progress++;
            }
        }, 5000);
    });

    container.addEventListener('mouseleave', () => {
        content.innerHTML = originalContent;
        clearTimeout(hoverTimer);
    });
});

// ==== HEADER LOGIC ====
let headerHoveredOnce = false;
let headerClicked = false;
let hoverTimer;
const headerh1Text = headerh1.innerHTML;
const headerpText = headerp.innerHTML;
let prevStyle = window.getComputedStyle(header).backgroundColor;

header.addEventListener('mouseenter', () => {
    if (headerHoveredOnce) return;
    header.style.backgroundColor = 'red';
    header.style.color = 'black';
    hoverTimer = setTimeout(() => {
        headerHoveredOnce = true;
        headerh1.innerHTML = 'Why?';
        headerp.innerHTML = 'Why are you here?';
        progress++;
    }, 10000);
});

header.addEventListener('mouseleave', () => {
    header.style.backgroundColor = prevStyle;
    header.style.color = '';
    headerh1.innerHTML = headerh1Text;
    headerp.innerHTML = headerpText;
    clearTimeout(hoverTimer);
});

header.addEventListener('dblclick', () => {
    if (!headerClicked) {
        headerClicked = true;
        setNotifier("DOUBLE CLICK???", "Okay hacker calm down.");
        progress++;
    }
});

// ==== FOOTER LOGIC ====
let footerClicked = false;
let footerClickCount = 0;

footer.addEventListener('click', () => {
    if (!footerClicked) {
        footerClicked = true;
        setNotifier('YOU CLICKED THE FOOTER', 'I mean, I guess you can click it.', 'red', 'black');
        progress++;
    }

    footerClickCount++;
    if (footerClickCount === 5) {
        setNotifier("FOOTER OBSESSED", "You clicked it 5 times.");
        progress++;
    }
});

// ==== WRONG CONTAINER CLICK ====
document.querySelectorAll('.containers').forEach(c => {
    c.addEventListener('click', () => {
        if (!c.dataset.clicked) {
            c.dataset.clicked = true;
            setNotifier('YOUR AIM IS TRASH', 'U tried to click on the containers, but u missed...ryt?');
            progress++;
        }
    });
});

// ==== KEYBOARD / SECRET DETECTIONS ====
let keyboardTriggered = false;
window.addEventListener('keydown', () => {
    if (!keyboardTriggered) {
        keyboardTriggered = true;
        setNotifier('TYPING???', 'Lemme guess...password is 1234?');
        progress++;
    }
});

let typedBuffer = '', typed = '';
document.addEventListener('keydown', (e) => {
    if (e.key.length === 1) {
        typedBuffer += e.key.toLowerCase();
        if (typedBuffer.includes("i'm bored")) {
            setNotifier('I KNEW IT', 'You’re officially bored enough to talk to a website.', 'teal', 'white');
            typedBuffer = '';
        }
        if (typedBuffer.length > 60) typedBuffer = typedBuffer.slice(-50);
    }

    typed += e.key.toLowerCase();
    if (typed.includes('hack')) {
        setNotifier("You typed: hack", "Hacker mode engaged.");
        progress++;
        typed = '';
    }
});

// ==== IDLE DETECTION ====
let idleTimer;
let idleDetected = false;

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        if (!idleDetected) {
            setNotifier("AFK Achieved", "You went idle for 30 seconds.");
            progress++;
            idleDetected = true;
        }
    }, 30000);
}
['mousemove', 'keydown', 'scroll', 'click'].forEach(evt =>
    document.addEventListener(evt, resetIdleTimer)
);
resetIdleTimer();

// ==== SCROLL DETECTION ====
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        setNotifier('Still scrolling, huh?', 'There’s literally nothing down there.', 'black', 'white');
    }
});

// ==== DEVTOOLS DETECTION ====
let devtoolsTriggered = false;
function detectDevTools() {
    const start = performance.now();
    debugger;
    const end = performance.now();
    if (end - start > 100 && !devtoolsTriggered) {
        devtoolsTriggered = true;
        setNotifier('HEY!', 'Stop inspecting me 😡', 'orange', 'black');
        progress++;
    }
}
setInterval(detectDevTools, 3000);

window.addEventListener('keydown', (e) => {
    const isDevShortcut = (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
    );
    if (isDevShortcut) detectDevTools();
});

// ==== ACHIEVEMENT SYSTEM ====
function showAchievement(title, msg) {
    popup.innerHTML = `<div>${title}</div><div style="font-size: 0.9em; font-weight: normal;">${msg}</div>`;
    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 6000);
}

function checkProgressBadges() {
    const badges = [
        { milestone: 5, title: '🎉 You unlocked: "Professional Loiterer"', msg: 'Congratulations! I guess?' },
        { milestone: 10, title: '🏆 You unlocked: "Master of Distraction"', msg: 'You really need to find a hobby.' },
        { milestone: 15, title: '🥇 You unlocked: "Ultimate Time Waster"', msg: 'Seriously, get a life.' },
        { milestone: 20, title: '🚀 You unlocked: "Intergalactic Procrastinator"', msg: 'You could be an astronaut with this level of distraction.' },
        { milestone: 25, title: '👑 You unlocked: "King/Queen of Avoidance"', msg: 'You deserve a throne for this.' },
    ];

    badges.forEach(badge => {
        if (progress === badge.milestone && !unlockedBadges.includes(badge.milestone)) {
            unlockedBadges.push(badge.milestone);
            showAchievement(badge.title, badge.msg);
        }
    });
}
setInterval(checkProgressBadges, 1000);

// ==== SECRET GLOW EFFECT ====
document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.altKey && e.code === 'KeyD') {
        setNotifier('SECRET UNLOCKED', 'You’re a hacker now.', 'purple', 'white');
        header.style.boxShadow = '0 0 15px 5px orange';
        containers.forEach(container => container.style.boxShadow = '0 0 15px 5px orange');
        footer.style.boxShadow = '0 0 15px 5px orange';
    }
});

// ==== ROLL HINT BUTTON ====

// 20 fail messages, each repeated twice
const failHints = [
    "Better luck next click!",
    "Hmm... try again?",
    "That's not it.",
    "So close! (Not really.)",
    "Nope. Just no.",
    "Wrong universe.",
    "Nada. Zilch.",
    "Try harder.",
    "Oops. Try again.",
    "Failure unlocked!",
    "Meh.",
    "Hint not found.",
    "404: Clue missing.",
    "You blinked and missed it.",
    "Even I don't know what that was.",
    "You're warming up... or not.",
    "This is getting awkward.",
    "That’s a swing and a miss!",
    "No secrets here!",
    "I’m just wasting your time."
].flatMap(f => [f, f]); // repeat each twice

// Good/real hints
const goodHints = [
    "Try double-clicking something weird...",
    "Footer isn't just for decoration. 😏",
    "Who hovers over a container 31 times?",
    "Idle people get noticed 👀",
    "Try pressing Shift + Alt + D",
    "You reached the bottom, but why?",
    "Inspect me and I’ll scream.",
    "Header’s got secrets if you wait...",
    "Something unlocks at 3:33 AM...",
    "There’s something clickable you’ve ignored.",
    "Check what’s behind the logo 👀",
    "A long hover unlocks the truth.",
    "Spam clicking might reveal something...",
    "Move your mouse in a circle fast.",
    "Have you tried resizing the window?"
];

// Final combined array (shuffle optional)
const randomHints = [...failHints, ...goodHints];

rollHintBtn.addEventListener('click', () => {
    const hint = randomHints[Math.floor(Math.random() * randomHints.length)];
    hintDisplay.textContent = hint;

    const isGoodHint = goodHints.includes(hint) || hint.includes("👀");

    // Style based on hint type
    hintDisplay.style.color = isGoodHint ? 'lime' : 'gray';
    hintDisplay.style.fontWeight = isGoodHint ? 'bold' : 'normal';
});
