// =========================
// SYSTEM STORAGE ENGINE
// =========================

const SYSTEM_KEY = "BREAK_SYSTEM_V1";

function getSystem() {

    let system =
    JSON.parse(
        localStorage.getItem(SYSTEM_KEY)
    );

    if(system){
        return system;
    }

    system = {

        users: {

            user1: createDefaultUser(),

            user2: createDefaultUser(),

            user3: createDefaultUser()

        }

    };

    saveSystem(system);

    return system;
}

function saveSystem(system){

    localStorage.setItem(
        SYSTEM_KEY,
        JSON.stringify(system)
    );

}

function createDefaultUser(){

    return {

        status: "Available",

        currentBreak: null,

        shift:{
            start:"08:00",
            end:"16:30"
        },

        breaks:[

            {
                id:"break1",
                name:"Break 1",
                allowance:900,
                remaining:900
            },

            {
                id:"break2",
                name:"Break 2",
                allowance:900,
                remaining:900
            },

            {
                id:"lunch",
                name:"Lunch",
                allowance:1800,
                remaining:1800
            }

        ],

        history:[]
    };
}

function getUser(username){

    const system =
    getSystem();

    return system.users[username];

}

function updateUser(
    username,
    userData
){

    const system =
    getSystem();

    system.users[username] =
    userData;

    saveSystem(system);

}
