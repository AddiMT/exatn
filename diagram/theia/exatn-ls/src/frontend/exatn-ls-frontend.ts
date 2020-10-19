import { FrontendApplicationContribution, KeybindingContribution, OpenHandler, WidgetFactory } from '@theia/core/lib/browser';
import { CommandContribution, } from "@theia/core/lib/common";
import { LanguageClientContribution } from '@theia/languages/lib/browser';
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { ContainerModule } from "inversify";
import { DiagramConfiguration, DiagramManager, DiagramManagerProvider, LSDiagramCommandContribution, 
    LSDiagramKeybindingContribution } from 'sprotty-theia';
import { EDLDiagramConfiguration } from './diagram/di.config';
import { EDLDiagramLanguageClient } from './diagram/edl-diagram-language-client';
import { EDLDiagramManager } from './diagram/edl-diagram-manager';
import { EDLCommandContribution } from './exatn-ls-command-contribution';
import { EDLGrammarContribution } from './exatn-ls-grammar-contribution';
import { EDLLanguageClientContribution } from './exatn-ls-language-client-contribution';

export default new ContainerModule(bind => {
   
    bind(EDLLanguageClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toService(EDLLanguageClientContribution);
    bind(LanguageGrammarDefinitionContribution).to(EDLGrammarContribution).inSingletonScope();

    bind(EDLDiagramLanguageClient).toSelf().inSingletonScope();
    bind(CommandContribution).to(EDLCommandContribution);
    bind(CommandContribution).to(LSDiagramCommandContribution).inSingletonScope();      
    bind(KeybindingContribution).to(LSDiagramKeybindingContribution).inSingletonScope();

    bind(DiagramConfiguration).to(EDLDiagramConfiguration).inSingletonScope();
    bind(EDLDiagramManager).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(EDLDiagramManager);
    bind(OpenHandler).toService(EDLDiagramManager);
    bind(WidgetFactory).toService(EDLDiagramManager);
    bind(DiagramManagerProvider).toProvider<DiagramManager>((context) => {
        return () => {
            return new Promise<DiagramManager>((resolve) => {
                let diagramManager = context.container.get<EDLDiagramManager>(EDLDiagramManager);
                resolve(diagramManager);
            });
        };
    });
});