import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class TensorDiagram {
	
	public static void main(String[] args) {
		new TensorDiagram().run();
	}
	
	protected void run() {
		String currentState = "t0";
		String lastEvent = null;
		while (true) {
			if (currentState.equals("t0")) {
				System.out.println("Your are now in state 't0'. Possible events are [i].");
				lastEvent = receiveEvent();
				if ("i".equals(lastEvent)) {
					currentState = "t1";
				}
			}
			if (currentState.equals("t2")) {
				System.out.println("Your are now in state 't2'. Possible events are [i, j].");
				lastEvent = receiveEvent();
				if ("i".equals(lastEvent)) {
					currentState = "t4";
				}
				if ("j".equals(lastEvent)) {
					currentState = "t3";
				}
			}
			if (currentState.equals("t3")) {
				System.out.println("Your are now in state 't3'. Possible events are [].");
				lastEvent = receiveEvent();
			}
			if (currentState.equals("t1")) {
				System.out.println("Your are now in state 't1'. Possible events are [].");
				lastEvent = receiveEvent();
			}
			if (currentState.equals("t4")) {
				System.out.println("Your are now in state 't4'. Possible events are [].");
				lastEvent = receiveEvent();
			}
			if (currentState.equals("t5")) {
				System.out.println("Your are now in state 't5'. Possible events are [k].");
				lastEvent = receiveEvent();
				if ("k".equals(lastEvent)) {
					currentState = "t2";
				}
			}
			if (currentState.equals("t6")) {
				System.out.println("Your are now in state 't6'. Possible events are [i].");
				lastEvent = receiveEvent();
				if ("i".equals(lastEvent)) {
					currentState = "t7";
				}
			}
			if (currentState.equals("t7")) {
				System.out.println("Your are now in state 't7'. Possible events are [].");
				lastEvent = receiveEvent();
			}
			if (currentState.equals("t8")) {
				System.out.println("Your are now in state 't8'. Possible events are [k].");
				lastEvent = receiveEvent();
				if ("k".equals(lastEvent)) {
					currentState = "t6";
				}
			}
			if (currentState.equals("t9")) {
				System.out.println("Your are now in state 't9'. Possible events are [i].");
				lastEvent = receiveEvent();
				if ("i".equals(lastEvent)) {
					currentState = "t0";
				}
			}
			if (currentState.equals("state0")) {
				System.out.println("Your are now in state 'state0'. Possible events are [].");
				lastEvent = receiveEvent();
			}
		}
	}
	
	private String receiveEvent() {
		System.out.flush();
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		try {
			return br.readLine();
		} catch (IOException ioe) {
			System.out.println("Problem reading input");
			return "";
		}
	}
}
