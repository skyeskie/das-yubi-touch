// Library to send signal to Q keyboards
const q = require('daskeyboard-applet');

const logger = q.logger;

const SOCKET = "$XDG_RUNTIME_DIR/yubikey-touch-detector.socket";

class DasYubiTouch extends q.DesktopApp {
    constructor() {
        super();

        this.pollingInterval = 3000;
        logger.info("DAS Keyboard touch ready");
    }
}
