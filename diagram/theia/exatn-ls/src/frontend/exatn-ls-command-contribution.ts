import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MessageService } from "@theia/core/lib/common";

export const EDLMessageCommand = {
    id: 'edlmessage.command',
    label: "Diagram Editor about message"
};

@injectable()
export class EDLCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(EDLMessageCommand, {
            execute: () => this.messageService.info('Diagram Editor can help you draw a tensor diagram for ExaTN!')
        });
    }
}


