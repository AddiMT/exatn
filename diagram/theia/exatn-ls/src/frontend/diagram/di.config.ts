import { Container, injectable } from "inversify";
import { configureCommand, configureModelElement, KeyTool, TYPES, SButton
 } from 'sprotty';
import { CodeActionPalettePopupProvider, CodeActionProvider, CompletionLabelEditor, 
    DeleteWithWorkspaceEditCommand, DiagramConfiguration, IRootPopupModelProvider, 
    LSTheiaDiagramServer, LSTheiaDiagramServerProvider, PaletteButton, PaletteMouseListener, 
    RenameLabelEditor, TheiaDiagramServer, TheiaKeyTool, WorkspaceEditCommand, EditDiagramLocker } from "sprotty-theia";
import { createTensorDiagramContainer } from 'exatn-sprotty/lib/di.config';
import { PaletteButtonView } from 'exatn-sprotty/lib/html-views';
import { EDLDiagramServer } from "./edl-diagram-server";
import "sprotty-theia/css/theia-sprotty.css"
export const EDL_DIAGRAM_TYPE = 'edl-diagram';

@injectable()
export class EDLDiagramConfiguration implements DiagramConfiguration {
    diagramType = EDL_DIAGRAM_TYPE;

    createContainer(widgetId: string): Container {
        const container = createTensorDiagramContainer(widgetId);
        container.bind(EDLDiagramServer).toSelf().inSingletonScope();
        container.bind(TheiaDiagramServer).toService(EDLDiagramServer);
        container.bind(LSTheiaDiagramServer).toService(EDLDiagramServer);
        container.bind(TYPES.ModelSource).toService(TheiaDiagramServer);
        container.rebind(KeyTool).to(TheiaKeyTool).inSingletonScope();

        container.bind(LSTheiaDiagramServerProvider).toProvider<LSTheiaDiagramServer>((context) => {
            return () => {
                return new Promise<LSTheiaDiagramServer>((resolve) => {
                    resolve(context.container.get(LSTheiaDiagramServer));
                });
            };
        });
        container.bind(CodeActionProvider).toSelf().inSingletonScope();
        container.bind(IRootPopupModelProvider).to(CodeActionPalettePopupProvider).inSingletonScope();
        container.bind(PaletteMouseListener).toSelf().inSingletonScope();
        container.rebind(TYPES.PopupMouseListener).to(PaletteMouseListener);
        
        configureModelElement(container, 'button:create', PaletteButton, PaletteButtonView);
        configureModelElement(container, 'button:CreateTensor', SButton, PaletteButtonView);
        configureModelElement(container, 'button:CreateEdge', SButton, PaletteButtonView);
        
        configureCommand(container, DeleteWithWorkspaceEditCommand);
        configureCommand(container, WorkspaceEditCommand);

        container.bind(CompletionLabelEditor).toSelf().inSingletonScope();
        container.bind(RenameLabelEditor).toSelf().inSingletonScope();
        
        container.bind(EditDiagramLocker).toSelf().inSingletonScope();
        container.rebind(TYPES.IDiagramLocker).toService(EditDiagramLocker);


        return container;
    }
}