/*
My IITK QR String:

02.240391,1,MEQCIAtKLEoSegaMcih655r/oFMptvWfDR5s8dMJUmjCPPDKAiBjrF2XL8dbStuPdEZ309tuz5DRL0tUlqyAj1c8XSbc7w==.iitkidcard
The roll number appears as:
240391
*/

function extractRollNumber(qrString) {

    const nums = qrString.match(/\d{6}/g);

    if (!nums) {
        return null;
    }

    for (const x of nums) {

        const roll = Number(x);

        if (roll >= 240001 && roll <= 240400) {
            return x;
        }
    }

    return null;
}

function isRegistered(rollNumber) {
    const roll = Number(rollNumber);
    return roll >= 240001 && roll <= 240400;
}

module.exports = {
    extractRollNumber,
    isRegistered
};

const testString = `
02.240391,1,MEQCIAtKLEoSegaMcih655r/oFMptvWfDR5s8dMJUmjCPPDKAiBjrF2XL8dbStuPdEZ309tuz5DRL0tUlqyAj1c8XSbc7w==.iitkidcard
`;