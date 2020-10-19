package io.exatn.theia.edl.ide.diagram

import org.eclipse.sprotty.xtext.DiagramServerFactory

class TensorsDiagramServerFactory extends DiagramServerFactory {

	override getDiagramTypes() {
		#['Tensors-diagram']
	}
}