// ============================
// SHIFT ENGINE V1
// ============================

const SHIFT_SETTINGS = {

    startHour: 8,
    startMinute: 0,

    endHour: 16,
    endMinute: 30

};

function getShiftProgress() {

    const now = new Date();

    const shiftStart =
    new Date();

    shiftStart.setHours(
        SHIFT_SETTINGS.startHour,
        SHIFT_SETTINGS.startMinute,
        0,
        0
    );

    const shiftEnd =
    new Date();

    shiftEnd.setHours(
        SHIFT_SETTINGS.endHour,
        SHIFT_SETTINGS.endMinute,
        0,
        0
    );

    const totalShift =
    shiftEnd - shiftStart;

    const elapsed =
    now - shiftStart;

    let percentage =
    (elapsed / totalShift) * 100;

    percentage =
    Math.max(
        0,
        Math.min(
            percentage,
            100
        )
    );

    return Math.round(
        percentage
    );
}

function getRemainingShiftTime() {

    const now =
    new Date();

    const shiftEnd =
    new Date();

    shiftEnd.setHours(
        SHIFT_SETTINGS.endHour,
        SHIFT_SETTINGS.endMinute,
        0,
        0
    );

    if(now > shiftEnd){

        return "Shift Complete";

    }

    const diff =
    shiftEnd - now;

    const hours =
    Math.floor(
        diff / 3600000
    );

    const mins =
    Math.floor(
        (
            diff % 3600000
        ) / 60000
    );

    return `${hours}h ${mins}m`;

}

function updateShiftUI(){

    const bar =
    document.getElementById(
        "shiftBar"
    );

    const percentage =
    document.getElementById(
        "shiftPercentage"
    );

    const remaining =
    document.getElementById(
        "shiftRemaining"
    );

    if(bar){

        bar.style.width =
        getShiftProgress() + "%";

    }

    if(percentage){

        percentage.innerText =
        getShiftProgress()
        + "%";

    }

    if(remaining){

        remaining.innerText =
        getRemainingShiftTime()
        + " remaining";

    }

}

function startShiftTracking(){

    updateShiftUI();

    setInterval(
        updateShiftUI,
        60000
    );

}
