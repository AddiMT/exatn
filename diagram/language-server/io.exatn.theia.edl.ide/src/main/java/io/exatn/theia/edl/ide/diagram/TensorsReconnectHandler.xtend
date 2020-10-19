package io.exatn.theia.edl.ide.diagram

import com.google.inject.Inject
import io.exatn.theia.edl.Tensors.Tensor
import io.exatn.theia.edl.Tensors.TensorDiagram
import org.eclipse.lsp4j.Range
import org.eclipse.lsp4j.TextEdit
import org.eclipse.lsp4j.WorkspaceEdit
import org.eclipse.sprotty.SEdge
import org.eclipse.sprotty.SModelElement
import org.eclipse.sprotty.SModelIndex
import org.eclipse.sprotty.xtext.ILanguageAwareDiagramServer
import org.eclipse.sprotty.xtext.ReconnectAction
import org.eclipse.sprotty.xtext.WorkspaceEditAction
import org.eclipse.sprotty.xtext.tracing.PositionConverter
import org.eclipse.sprotty.xtext.tracing.XtextTrace
import org.eclipse.xtext.ide.server.ILanguageServerAccess
import org.eclipse.xtext.ide.server.UriExtensions
import org.eclipse.xtext.nodemodel.util.NodeModelUtils
import static extension org.eclipse.xtext.EcoreUtil2.*

class TensorsReconnectHandler {
	
	@Inject UriExtensions uriExtensions
	@Inject extension PositionConverter
	
	def handle(ReconnectAction action, ILanguageAwareDiagramServer server) {
		val root = server.diagramTensor.currentModel
		val extension index = new SModelIndex(root)
		val routable = action.routableId?.get
		val source = action.newSourceId?.get
		val target = action.newTargetId?.get
		server.diagramLanguageServer.languageServerAccess.doRead(server.sourceUri, [ context |
			val sourceElement = source?.resolveElement(context)
			val targetElement = target?.resolveElement(context)
			if (sourceElement instanceof Tensor && targetElement instanceof Tensor) {
				val textEdits = newArrayList
				val DimensionName = sourceElement.getContainerOfType(TensorDiagram)?.Dimensions?.head?.name ?: 'undefined'
				val OperationText = '''«'\n\t'»«DimensionName» => «(targetElement as Tensor).name»'''
				val oldRange = getOldRange(routable)
				val newRange = getNewRange(sourceElement as Tensor)
				if (oldRange !== null) {
					if ((routable as SEdge).sourceId !== action.newSourceId) {
						textEdits += new TextEdit(oldRange, '')
						textEdits += new TextEdit(newRange, OperationText)
					} else {
						textEdits += new TextEdit(oldRange, OperationText)
					}
				} else {
					textEdits += new TextEdit(newRange, OperationText)
				}
				val workspaceEdit = new WorkspaceEdit() => [
					changes = #{ server.sourceUri -> textEdits }
				]
				server.dispatch(new WorkspaceEditAction => [
					it.workspaceEdit = workspaceEdit
				]);
				}
			return null
		])
	}
	
	private def getOldRange(SModelElement routable) {
		if (routable?.trace !== null) 
			new XtextTrace(routable.trace).range
		else 
			null
	}
	
	private def getNewRange(Tensor sourceElement) {
		val position = NodeModelUtils.findActualNodeFor(sourceElement).endOffset.toPosition(sourceElement)
		return new Range(position, position)
	}
	
	
	private def resolveElement(SModelElement sElement, ILanguageServerAccess.Context context) {
		if (sElement.trace !== null) {
			val connectableURI = sElement.trace.toURI
			return context.resource.resourceSet.getEObject(connectableURI, true);
		} else {
			return null
		}
	}
	
	private def toURI(String path) {
		val parts = path.split('#')
		if(parts.size !== 2)
			throw new IllegalArgumentException('Invalid trace URI ' + path)
		return uriExtensions.toUri(parts.head).trimQuery.appendFragment(parts.last)
	}
}
