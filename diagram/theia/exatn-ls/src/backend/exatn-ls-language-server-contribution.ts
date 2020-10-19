import { isWindows } from '@theia/core/lib/common/os';
import { BaseLanguageServerContribution, IConnection } from '@theia/languages/lib/node';
import { injectable } from 'inversify';
import * as net from 'net';
import { join, resolve } from 'path';
import { createSocketConnection } from 'vscode-ws-jsonrpc/lib/server';
import { EDL_SERVER_ID, EDL_SERVER_NAME } from '../common/global';

const EXECUTABLE_NAME = isWindows ? 'edl-language-server.bat' : 'edl-language-server';
const EXECUTABLE_PATH = resolve(join(__dirname, '..', '..', 'build', 'edl-language-server', 'bin', EXECUTABLE_NAME));

@injectable()
export class EDLLanguageServerContribution extends BaseLanguageServerContribution {

    readonly id = EDL_SERVER_ID;
    readonly name = EDL_SERVER_NAME;

    readonly description = {
        id: EDL_SERVER_ID,
        name: EDL_SERVER_NAME,
        documentSelector: [EDL_SERVER_ID],
        fileEvents: [
            '**/*.'+EDL_SERVER_ID
        ]
    }

    getPort(): number | undefined {
        let arg = process.argv.filter(arg => arg.startsWith('--EDL_LSP='))[0];
        if (!arg) {
            return undefined;
        } else {
            return Number.parseInt(arg.substring('--EDL_LSP='.length), 10);
        }
    }

    start(clientConnection: IConnection): void {
        let socketPort = this.getPort();
        if (socketPort) {
            const socket = new net.Socket();
            socket.connect(socketPort);
            const serverConnection = createSocketConnection(socket, socket, () => {
                socket.destroy();
            });
            this.forward(clientConnection, serverConnection);
        } else {
            const args: string[] = [];
            const serverConnection = this.createProcessStreamConnection(EXECUTABLE_PATH, args);
            this.forward(clientConnection, serverConnection);
        }
    }
}
