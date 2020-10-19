import { EditorManager } from "@theia/editor/lib/browser";
import { inject, injectable } from "inversify";
import { DiagramLanguageClient } from "sprotty-theia";
import { EDLLanguageClientContribution } from "../exatn-ls-language-client-contribution";

@injectable()
export class EDLDiagramLanguageClient extends DiagramLanguageClient {
    constructor(
        @inject(EDLLanguageClientContribution) languageClientContribution: EDLLanguageClientContribution,
        @inject(EditorManager) editorManager: EditorManager) {
        super(languageClientContribution, editorManager)
    }
}