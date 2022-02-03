import * as q from 'daskeyboard-applet';
import * as unix from 'unix-dgram';
import { xdgRuntime } from 'xdg-basedir';

const logger = q.logger;

const YTD_SOCKET_NAME = 'yubikey-touch-detector.socket';

class DasYubiTouch extends q.DesktopApp {
    constructor() {
        super();

        this.server = unix.createSocket('unix_dgram', this.updateTouch);

        this.server.bind(xdgRuntime + '/' + YTD_SOCKET_NAME);

        logger.info('DAS YubiTouch ready');
    }

    signalClear() {
        this.signal(new q.Signal({
            points: [new q.Point(this.config.defaultColor)]
        }));
    }

    signalNeedTouch() {
        this.signal(new q.Signal({
            points: [new q.Point(this.config.waitColor, q.Effects.BLINK)]
        }));
    }

    async updateTouch(buf) {
        console.log('Received ' + buf);
        // So should get GPG_1, GPG_0, U2F_1, U2F_0
        // 0 events are stop wait for touch
        // 1 events are start wait for touch
    }

    shutdown() {
        this.server.close();
    }
}

// module.exports = {
//     DasYubiTouch: DasYubiTouch
// };

// daskeyboard-applet indicates that needs to instantiate
// eslint-disable-next-line no-unused-vars
const dasYubiTouch = new DasYubiTouch();
