package io.exatn.theia.edl.ide.launch

import org.eclipse.sprotty.xtext.launch.DiagramServerLauncher

class TensorsServerLauncher extends DiagramServerLauncher {
	
	override createSetup() {
		new TensorsLanguageServerSetup
	}

	def static void main(String[] args) {
		new TensorsServerLauncher().run(args)
	}
}
