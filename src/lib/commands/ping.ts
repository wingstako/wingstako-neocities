import { displayStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { IAsyncCommand } from '../types/command.interface';

export class PingCommand implements IAsyncCommand {

    async execute(args: string[]): Promise<void> {

        if (args[0] === undefined || args[0] === '') {
            const message = createTerminalMessage({
                message: 'ping: missing parameter',
            });
            displayStore.update((display) => display.concat(message));
            return Promise.resolve();
        }

        const url = args[0];
        const ipResponse = await getIpAddress(url);
        let ip = '';
        if (ipResponse.status === 'NO_RECORDS' || ipResponse.status === 'INVALID_HOST') {
            const message = createTerminalMessage({
                message: `ping: ${url}: Name or service not known`,
            });
            displayStore.update((display) => display.concat(message));
            return Promise.resolve();
        } else {
            ip = url === ('localhost') ? '127.0.0.1' : ipResponse.records.A![0].address!;
        }

        displayStore.update((display) => display.concat(createTerminalMessage({
            message: `Pinging ${url} [${ip}]...`,
        })));

        let success = 0, fail = 0;
        for (let i = 0; i < 4; i++) {
            try {
                const start = new Date().getTime();
                // most of the time, the request will be upgraded to HTTPS
                await fetch(`https://${url}`, { mode: 'no-cors' });
                // await fetch(`http://${ip}`, { mode: 'no-cors' });
                const end = new Date().getTime();
                const ms = end - start;

                const message = createTerminalMessage({
                    message: `Reply from ${ip}: time=${ms}ms`,
                });
                displayStore.update((display) => display.concat(message));
                success++;
            } catch (e) {
                fail++;
                const message = createTerminalMessage({
                    message: `Request timed out`,
                });
                displayStore.update((display) => display.concat(message));
            } finally {
                await new Promise(r => setTimeout(r, 1000));
            }
        }

        displayStore.update((display) => display.concat(createTerminalMessage({
            message: `<pre>
Ping statistics for ${ip}:
    Packets: Sent = ${fail + success}, Received = ${success}, Lost = ${fail} (${(fail / (fail + success)) * 100}% loss)</pre>`,
            html: true,
        })));

        return Promise.resolve();
    }


}

async function getIpAddress(domain: string): Promise<DNSLookupResponse> {
    const response = await fetch(`https://networkcalc.com/api/dns/lookup/${domain}`);
    const data: DNSLookupResponse = await response.json();
    return data;
}

type DNSRecord = {
    address?: string;
    ttl?: number;
    exchange?: string;
    priority?: number;
    nameserver?: string;
    hostmaster?: string;
};

type DNSRecords = {
    A?: DNSRecord[];
    CNAME?: DNSRecord[];
    MX?: DNSRecord[];
    NS?: DNSRecord[];
    SOA?: DNSRecord[];
    TXT?: string[];
};

type DNSLookupResponse = {
    status: string;
    hostname: string;
    records: DNSRecords;
};