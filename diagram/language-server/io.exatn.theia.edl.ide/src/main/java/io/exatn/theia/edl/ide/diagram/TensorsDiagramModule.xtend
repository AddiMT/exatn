package io.exatn.theia.edl.ide.diagram

import org.eclipse.sprotty.xtext.DefaultDiagramModule
import org.eclipse.sprotty.xtext.IDiagramGenerator

class TensorsDiagramModule extends DefaultDiagramModule {
	
	def Class<? extends IDiagramGenerator> bindIDiagramGenerator() {
		TensorsDiagramGenerator
	} 
	
	override bindIDiagramServerFactory() {
		TensorsDiagramServerFactory
	}
	
	override bindILayoutEngine() {
		TensorsLayoutEngine
	}
	
	override bindIDiagramServer() {
		TensorsDiagramServer
	}	
}
