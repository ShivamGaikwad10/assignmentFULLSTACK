const fs = require('fs');

const FILE = 'attendance.json';

let store = {};

try {

    store = JSON.parse(
        fs.readFileSync(FILE, 'utf8')
    );

} catch (err) {
    // file probably doesn't exist yet
    store = {};
}

function markPresent(rollNumber) {

    if (store[rollNumber]) {

        return {
            success: false,
            reason: 'already_marked',
            timestamp: store[rollNumber]
        };
    }

    const time = new Date().toISOString();

    store[rollNumber] = time;

    fs.writeFileSync(
        FILE,
        JSON.stringify(store, null, 2)
    );

    return {
        success: true
    };
}

function getStats() {

    const rolls = Object.keys(store);

    rolls.sort();

    return {
        total: rolls.length,
        rollNumbers: rolls
    };
}

module.exports = {
    markPresent,
    getStats
};