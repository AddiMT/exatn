import { QuickPickService, WidgetManager } from '@theia/core/lib/browser';
import { EditorManager } from '@theia/editor/lib/browser';
import { MonacoWorkspace } from '@theia/monaco/lib/browser/monaco-workspace';
import { inject, injectable } from 'inversify';
import { DiagramManager, LSTheiaSprottyConnector, TheiaFileSaver, TheiaSprottyConnector } from 'sprotty-theia';
import { EDL_DIAGRAM_TYPE } from './di.config';
import { EDLDiagramLanguageClient } from './edl-diagram-language-client';

@injectable()
export class EDLDiagramManager extends DiagramManager {

    readonly diagramType = EDL_DIAGRAM_TYPE;
    readonly iconClass = 'fa fa-sitemap';

    _diagramConnector: TheiaSprottyConnector;

    constructor(@inject(EDLDiagramLanguageClient) diagramLanguageClient: EDLDiagramLanguageClient,
                @inject(TheiaFileSaver) fileSaver: TheiaFileSaver,
                @inject(WidgetManager) widgetManager: WidgetManager,
                @inject(EditorManager) editorManager: EditorManager,
                @inject(MonacoWorkspace) workspace: MonacoWorkspace,
                @inject(QuickPickService) quickPickService: QuickPickService) {
        super();
        this._diagramConnector = new LSTheiaSprottyConnector({diagramLanguageClient, fileSaver, editorManager, widgetManager, workspace, quickPickService, diagramManager: this});
    }

    get diagramConnector() {
        return this._diagramConnector;
    }

    get label() {
        return 'ExaTN tensor diagram';
    }
}