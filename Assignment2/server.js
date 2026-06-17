const express = require('express');
const multer = require('multer');

const { decodeQR } = require('./qr');
const {
    extractRollNumber,
    isRegistered
} = require('./parser');

const {
    markPresent,
    getStats
} = require('./attendance');

const app = express();

const upload = multer({
    dest: 'uploads/'
});

app.use(express.static('public'));

app.post(
    '/upload',
    upload.single('qrImage'),
    async (req, res) => {

        try {

            const qrText =
                await decodeQR(req.file.path);

            const rollNumber =
                extractRollNumber(qrText);

            if (!rollNumber) {

                return res.send(
                    '<h2>No roll number found in QR.</h2>'
                );
            }

            if (!isRegistered(rollNumber)) {

                return res.send(
                    '<h2>Roll number out of range.</h2>'
                );
            }

            const result =
                markPresent(rollNumber);

            if (!result.success) {

                return res.send(
                    `<h2>Attendance already marked.</h2>
                     <p>${result.timestamp}</p>`
                );
            }

            res.send(
                `<h2>Attendance marked for ${rollNumber}</h2>`
            );

        } catch (err) {

            if (
                err.message ===
                'No QR code found'
            ) {

                return res.send(
                    '<h2>No QR code detected.</h2>'
                );
            }

            res.send(
                `<h2>Error</h2>
                 <p>${err.message}</p>`
            );
        }
    }
);

app.get('/report', (req, res) => {

    const stats = getStats();

    let html = `
    <h2>Attendance Report</h2>
    <p>Total Present: ${stats.total}</p>
    <ul>
    `;
    for (const roll of stats.rollNumbers) {
        html += `<li>${roll}</li>`;
    }
    html += '</ul>';
    res.send(html);
});

app.listen(3000, () => {
    console.log(
        'Server running on http://localhost:3000'
    );
});