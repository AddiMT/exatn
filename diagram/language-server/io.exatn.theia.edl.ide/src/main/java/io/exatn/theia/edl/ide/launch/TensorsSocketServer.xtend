package io.exatn.theia.edl.ide.launch

import org.eclipse.sprotty.xtext.launch.DiagramServerSocketLauncher

class TensorsSocketServer extends DiagramServerSocketLauncher {

	override createSetup() {
		new TensorsLanguageServerSetup
	}

	def static void main(String... args) {
		new TensorsSocketServer().run(args)
	}
}
