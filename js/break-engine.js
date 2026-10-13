// ============================
// BREAK ENGINE V1
// ============================

let activeBreakTimer = null;

function getCurrentUser() {

    return localStorage.getItem(
        "currentUser"
    );

}

function startBreak(breakId) {

    const username =
    getCurrentUser();

    const user =
    getUser(username);

    // Stop multiple breaks
    if (user.currentBreak) {

        alert(
            "You already have a break running."
        );

        return;
    }

    user.status = "On Break";

    user.currentBreak = {

        breakId: breakId,

        startTime: Date.now()

    };

    updateUser(
        username,
        user
    );

    startLiveTracking();

}

function stopBreak() {

    const username =
    getCurrentUser();

    const user =
    getUser(username);

    if (!user.currentBreak) {

        return;

    }

    const now =
    Date.now();

    const elapsedSeconds =
    Math.floor(
        (now -
        user.currentBreak.startTime)
        / 1000
    );

    const breakObj =
    user.breaks.find(
        b =>
        b.id ===
        user.currentBreak.breakId
    );

    if (breakObj) {

        breakObj.remaining =
        Math.max(
            0,
            breakObj.remaining -
            elapsedSeconds
        );

    }

    user.history.unshift({

        type:
        breakObj.name,

        start:
        new Date(
            user.currentBreak.startTime
        ).toLocaleTimeString(),

        end:
        new Date()
        .toLocaleTimeString(),

        duration:
        elapsedSeconds

    });

    user.status =
    "Available";

    user.currentBreak =
    null;

    updateUser(
        username,
        user
    );

    stopLiveTracking();

    if (
        typeof render ===
        "function"
    ) {

        render();

    }

}

function startLiveTracking() {

    stopLiveTracking();

    activeBreakTimer =
    setInterval(() => {

        refreshActiveBreak();

    }, 1000);

}

function stopLiveTracking() {

    if (
        activeBreakTimer
    ) {

        clearInterval(
            activeBreakTimer
        );

        activeBreakTimer =
        null;

    }

}

function refreshActiveBreak() {

    const username =
    getCurrentUser();

    const user =
    getUser(username);

    if (
        !user.currentBreak
    ) {
        return;
    }

    const elapsed =
    Math.floor(

        (
            Date.now() -
            user.currentBreak.startTime
        ) / 1000

    );

    const timer =
    document.getElementById(
        "liveTimer"
    );

    if (timer) {

        timer.innerText =
        formatSeconds(
            elapsed
        );

    }

}

function formatSeconds(
    seconds
) {

    const mins =
    Math.floor(
        seconds / 60
    );

    const secs =
    seconds % 60;

    return `${mins}:${
        String(secs)
        .padStart(2, "0")
    }`;

}

function getRemainingTime(
    breakId
) {

    const username =
    getCurrentUser();

    const user =
    getUser(username);

    const breakObj =
    user.breaks.find(
        b =>
        b.id === breakId
    );

    if (
        !breakObj
    ) {

        return 0;

    }

    return breakObj.remaining;

}
``
