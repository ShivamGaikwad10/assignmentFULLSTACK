class Student {
    constructor(n, s) {
        this.name = n;
        this.scores = s;
    }

    get average () {
        let x = 0;
        for (let i = 0; i < this.scores.length; i++) {
            x += this.scores[i];
        }

        x /= this.scores.length;
        return x;
    }

    get letterGrade () {
        let avg = this.average;
        if (avg >= 90) {
            return 'A';
        } else if (avg >= 80) {
            return 'B';
        } else if (avg >= 70) {
            return 'C';
        } else if (avg >= 60) {
            return 'D';
        } else {
            return 'F';
        }
        /*
        A - [90, 100]
        B - [80, 89]
        C - [70, 79]
        D - [60, 69]
        F - [0, 59]
        */
    }

    summary () {
        let highest = this.scores[0], lowest = this.scores[0];
            for (let i = 1; i < this.scores.length; i++) {
                if (this.scores[i] > highest) {
                    highest = this.scores[i];
                }
                if (this.scores[i] < lowest) {
                    lowest = this.scores[i];
                }
            }

            return {highest, lowest};
    }
}

function getRemark(grade) {
    switch (grade) {
        case 'A':
            return 'Excellent';
        case 'B':
            return 'Good';
        case 'C':
            return 'Average';
        case 'D':
            return 'Below Average';
        default:
            return 'Fail';
    }
}

function print(s1, cnt) {
    console.log(`\nStudent ${cnt}\n`);
    console.log(`Name : ${s1.name}`);
    console.log(`Scores : ${s1.scores}`);
    console.log(`Grade : ${s1.letterGrade}`);
    console.log(`Average : ${s1.average.toFixed(1)}`);

    const {highest, lowest} = s1.summary();
    console.log(`Highest : ${highest}`);
    console.log(`Lowest : ${lowest}`);

    s1.average >= 60 ? console.log("Result : Pass") : console.log("Result : Fail");
    console.log(`Remark : ${(getRemark(s1.letterGrade))}`);

    const [score1, score2, ...remaining] = s1.scores;
    console.log(`Score 1: ${score1}`);
    console.log(`Score 2: ${score2}`);
    console.log(`Remaining: ${remaining.length > 0 ? remaining.join(', ') : 'None'}`);
}

// Input
const fs = require('fs');
const data = fs.readFileSync('students.json', 'utf8');
const students = JSON.parse(data);

// print report
let bestS = null;
let mx = 0, cnt = 1;

console.log(`\nReport Cards`);

for (const s of students) {
    const s1 = new Student(s.name, s.scores);

    if (s1.scores.length < 3) {
        console.log("Please enter at least 3 scores!");
    } else {
        if (mx < s1.average) {
            bestS = s1;
            mx = s1.average;
        }
        print(s1, cnt);
        cnt++;
    }
}

console.log("\nTop Performer");
console.log(`Name : ${bestS.name}`);
console.log(`Average : ${mx.toFixed(1)}`);
