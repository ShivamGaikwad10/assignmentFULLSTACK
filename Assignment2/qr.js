const { Jimp } = require('jimp');
const jsQR = require('jsqr');

async function decodeQR(imagePath) {

    const image = await Jimp.read(imagePath);

    const data = image.bitmap.data;
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    const qr = jsQR(
        new Uint8ClampedArray(data),
        width,
        height
    );

    if (qr === null) {
        throw new Error('No QR code found');
    }

    return qr.data;
}

module.exports = { decodeQR };

if (require.main === module) {

    (async () => {

        try {

            const ans =
                await decodeQR('./test.jpeg');

            console.log(ans);

        } catch (err) {

            console.log(err.message);
        }

    })();
}