import { LanguageGrammarDefinitionContribution, TextmateRegistry } from '@theia/monaco/lib/browser/textmate';
import { injectable } from 'inversify';
import { EDL_FILE_EXTENSION, EDL_SERVER_ID, EDL_SERVER_NAME } from '../common/global';


@injectable()
export class EDLGrammarContribution implements LanguageGrammarDefinitionContribution {


    registerTextmateLanguage(registry: TextmateRegistry) {

            const sourceScope = 'source.edl';
        const edlGrammar = require('../../data/exatndiagramlanguage.tmLanguage.json'); 
        registry.registerTextmateGrammarScope(sourceScope, {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: edlGrammar,
                };
            }
        });
        registry.registerGrammarConfiguration('edl', {
            tokenizerOption: {
            }
        });
        registry.mapLanguageIdToTextmateGrammar('edl', sourceScope);


         
        monaco.languages.register({
            id: EDL_SERVER_ID,
            aliases: [
                EDL_SERVER_NAME, EDL_SERVER_ID
            ],
            extensions: [
                EDL_FILE_EXTENSION,
            ],
            mimetypes: [
                'text/edl'
            ]
        });
        monaco.languages.setLanguageConfiguration(EDL_SERVER_ID, this.configuration);

    }

    protected configuration: monaco.languages.LanguageConfiguration = {
        'comments': {
            'lineComment': '//',
            'blockComment': ['/*', '*/']
        },
        'brackets': [
            ['{', '}'],
            ['[', ']'],
            ['(', ')']
        ],
        'autoClosingPairs': [
            { 'open': '{', 'close': '}' },
            { 'open': '[', 'close': ']' },
            { 'open': '(', 'close': ')' },
            { 'open': "'", 'close': "'", 'notIn': ['string', 'comment'] },
            { 'open': '"', 'close': '"', 'notIn': ['string'] },
            { 'open': '/**', 'close': ' */', 'notIn': ['string'] }
        ],
        'surroundingPairs': [
            { 'open': '{', 'close': '}' },
            { 'open': '[', 'close': ']' },
            { 'open': '(', 'close': ')' },
            { 'open': "'", 'close': "'" },
            { 'open': '"', 'close': '"' },
            { 'open': '`', 'close': '`' }
        ],
        'folding': {
            'markers': {
                'start': new RegExp('^\\s*//\\s*#?region\\b'),
                'end': new RegExp('^\\s*//\\s*#?endregion\\b')
            }
        }
    };
}
