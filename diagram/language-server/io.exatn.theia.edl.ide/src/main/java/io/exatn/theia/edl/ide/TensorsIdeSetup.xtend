/*
 * generated by Xtext 2.16.0
 */
package io.exatn.theia.edl.ide

import com.google.inject.Guice
import io.exatn.theia.edl.TensorsRuntimeModule
import io.exatn.theia.edl.TensorsStandaloneSetup
import org.eclipse.xtext.util.Modules2
import io.exatn.theia.edl.ide.diagram.TensorsDiagramModule

/**
 * Initialization support for running Xtext languages as language servers.
 */
class TensorsIdeSetup extends TensorsStandaloneSetup {

	override createInjector() {
		Guice.createInjector(Modules2.mixin(new TensorsRuntimeModule, new TensorsIdeModule, new TensorsDiagramModule))
	}
	
}
