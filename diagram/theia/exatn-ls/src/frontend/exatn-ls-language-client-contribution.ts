import { LanguageClientFactory, Languages, Workspace } from '@theia/languages/lib/browser';
import { inject, injectable, multiInject } from 'inversify';
import { DiagramManagerProvider,DiagramLanguageClientContribution } from 'sprotty-theia';
import { EDL_FILE_EXTENSION, EDL_SERVER_ID, EDL_SERVER_NAME } from '../common/global';


@injectable()
export class EDLLanguageClientContribution extends DiagramLanguageClientContribution {

    readonly id = EDL_SERVER_ID;
    readonly name = EDL_SERVER_NAME;

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory,
        @multiInject(DiagramManagerProvider) protected diagramManagerProviders: DiagramManagerProvider[]) {
        super(workspace, languages, languageClientFactory, diagramManagerProviders)
    }

    protected get globPatterns(): string[] {
        return [
            '**/*' + EDL_FILE_EXTENSION,
        ];
    }

    protected get documentSelector(): string[] {
        return [
            EDL_SERVER_ID
        ];
    }
}

