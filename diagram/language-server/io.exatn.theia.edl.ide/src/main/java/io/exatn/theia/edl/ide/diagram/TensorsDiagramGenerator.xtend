package io.exatn.theia.edl.ide.diagram

import com.google.inject.Inject
import io.exatn.theia.edl.tensors.Tensor
import io.exatn.theia.edl.tensors.TensorDiagram
import io.exatn.theia.edl.tensors.TensorsPackage
import io.exatn.theia.edl.tensors.Operation
import org.eclipse.emf.ecore.EObject
import org.eclipse.sprotty.LayoutOptions
import org.eclipse.sprotty.SEdge
import org.eclipse.sprotty.SGraph
import org.eclipse.sprotty.SLabel
import org.eclipse.sprotty.SModelElement
import org.eclipse.sprotty.SNode
import org.eclipse.sprotty.SPort
import org.eclipse.sprotty.xtext.IDiagramGenerator
import org.eclipse.sprotty.xtext.SIssueMarkerDecorator
import org.eclipse.sprotty.xtext.tracing.ITraceProvider
import static io.exatn.theia.edl.tensors.TensorsPackage.Literals.*

class TensorsDiagramGenerator implements IDiagramGenerator {
	
	@Inject extension ITraceProvider
	@Inject extension SIssueMarkerDecorator
	
	override generate(Context context) {
		(context.resource.contents.head as TensorDiagram).toSGraph(context)
	}
	
	def toSGraph(TensorDiagram sm, extension Context context) {
		(new SGraph [
			id = idCache.uniqueId(sm, sm?.name ?: "undefined")
			children = (sm.Tensors.map[toSNode(context)] 
					  + sm.Tensors.map[Operations].flatten.map[toSEdge(context)]
			).toList 
		]).traceAndMark(sm, context)
	}
	
	def SNode toSNode(Tensor Tensor, extension Context context) {
		val theId = idCache.uniqueId(Tensor, Tensor.name) 
		(new SNode [
			id = theId
			children =  #[
				(new SLabel [
					id = idCache.uniqueId(theId + '.label')
					text = Tensor.name 
				]).trace(Tensor, Tensor__NAME, -1),
				new SPort [
					id = idCache.uniqueId(theId + '.newOperation')
				]				
			]
			layout = 'stack'
			layoutOptions = new LayoutOptions [
				paddingTop = 10.0
				paddingBottom = 10.0
				paddingLeft = 10.0
				paddingRight = 10.0
				
			]
		]).traceAndMark(Tensor, context)
	}
	
	def SEdge toSEdge(Operation Operation, extension Context context) {
		(new SEdge [
			sourceId = idCache.getId(Operation.eContainer) 
			targetId = idCache.getId(Operation.Tensor)
			val theId = idCache.uniqueId(Operation, sourceId + ':' + Operation.Dimension.name + ':' + targetId)
			id = theId 
			children = #[
				(new SLabel [
					id = idCache.uniqueId(theId + '.label')
					type = 'label:xref'
					text = Operation.Dimension.name
				]).trace(Operation, TensorsPackage.Literals.Operation__Dimension, -1)
			]
		]).traceAndMark(Operation, context)
	}
	
	def <T extends SModelElement> T traceAndMark(T sElement, EObject element, Context context) {
		sElement.trace(element).addIssueMarkers(element, context) 
	}
}