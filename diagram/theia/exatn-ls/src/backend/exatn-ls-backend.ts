import { ContainerModule } from 'inversify';
import { LanguageServerContribution } from '@theia/languages/lib/node';
import { EDLLanguageServerContribution } from './exatn-ls-language-server-contribution';


export default new ContainerModule(bind => {
    bind(LanguageServerContribution).to(EDLLanguageServerContribution).inSingletonScope();
});

