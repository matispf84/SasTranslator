var SerialPort = require("serialport");

var serialPort = new SerialPort("COM4", {
    baudRate: 19200
})

serialPort.on('open', onOpen);
serialPort.on('data', onData);
serialPort.on('error', onError)

var buffer = new ArrayBuffer();

function GeneralPoll() {

    setTimeout(function () {
        buffer = [0x80];
        serialPort.parity = 'mark';
        serialPort.write(buffer, function () {
            console.log('Tx: ' + toHex(buffer))
        })
    }, 20);

    buffer = [0x86];
    serialPort.parity = 'space';
    serialPort.write(buffer, function () {
        console.log('Tx: ' + toHex(buffer))
    })

}

setInterval(function () {
    GeneralPoll();
}, 250);

function onOpen() {
    console.log("Abriendo puerto.");
}

function onData(data) {
    console.log("Rx: " + data);
}

function onError(err) {
    console.log('Error: ', err.message)
}

function toHex(d) {
    return ("0" + (Number(d).toString(16))).slice(-2).toUpperCase()
}