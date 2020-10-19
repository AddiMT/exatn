package io.exatn.theia.edl.ide.server.codeActions

import io.exatn.theia.edl.Tensors.TensorDiagram
import java.util.List
import org.eclipse.emf.common.util.URI
import org.eclipse.emf.ecore.EObject
import org.eclipse.lsp4j.CodeAction
import org.eclipse.lsp4j.CodeActionParams
import org.eclipse.lsp4j.Command
import org.eclipse.lsp4j.Position
import org.eclipse.lsp4j.Range
import org.eclipse.lsp4j.TextEdit
import org.eclipse.lsp4j.WorkspaceEdit
import org.eclipse.lsp4j.jsonrpc.messages.Either
import org.eclipse.xtext.ide.server.Document
import org.eclipse.xtext.ide.server.codeActions.ICodeActionService2

class TensorsCodeActionService implements ICodeActionService2 {
	
	static val CREATE_Tensor_KIND = 'sprotty.create.Tensor'
	static val CREATE_Dimension_KIND = 'sprotty.create.Dimension'
	
	
	override getCodeActions(Options options) {
		var root = options.resource.contents.head
		if (root instanceof TensorDiagram)
			createCodeActions(root, options.codeActionParams, options.document)
		 else
		 	emptyList
	}
	
	private def dispatch List<Either<Command, CodeAction>> createCodeActions(TensorDiagram TensorDiagram, CodeActionParams params, Document document) {
		val result = <Either<Command, CodeAction>>newArrayList
		if (CREATE_Tensor_KIND.matchesContext(params)) {
			result.add(Either.forRight(new CodeAction => [
				kind = CREATE_Tensor_KIND
				title = 'new Tensor' 
				edit = createInsertWorkspaceEdit(
					TensorDiagram.eResource.URI, 
					document.getPosition(document.contents.length), 
					'''«'\n'»tensor «getNewName('tensor', TensorDiagram.Tensors.map[name])»'''
				)
			]));
		}
		if (CREATE_Dimension_KIND.matchesContext(params)) {
			result.add(Either.forRight(new CodeAction => [
				kind = CREATE_Dimension_KIND
				title = 'new Dimension' 
				edit = createInsertWorkspaceEdit(
					TensorDiagram.eResource.URI, 
					document.getPosition(document.contents.length), 
					'''«'\n'»dimension «getNewName('dimension', TensorDiagram.Dimensions.map[name])»'''
				)
			]));
		}
		return result			
	}
	
	private def matchesContext(String kind, CodeActionParams params) {
		if (params.context?.only === null)
			return true
		else 
			return params.context.only.exists[kind.startsWith(it)]
	}
	
	private def String getNewName(String prefix, List<? extends String> siblings) {
		for(var i = 0;; i++) {
			val currentName = prefix + i
			if (!siblings.exists[it == currentName])
				return currentName
		}
	}
		
	private def dispatch List<Either<Command, CodeAction>> createCodeActions(EObject element, CodeActionParams params, Document document) {
		return emptyList 
	}
	
	private def createInsertWorkspaceEdit(URI uri, Position position, String text) {
		new WorkspaceEdit => [
			changes = #{uri.toString -> #[ new TextEdit(new Range(position, position), text) ]}
		]
	}	
}