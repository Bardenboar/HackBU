package application;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Model {
	public List<String> ballX,ballY, arcsX, arcsY;
	public String[] keys;

	public Model() {
		// TODO Auto-generated constructor stub
		String[] ballArrayX = { "542", "543", "544", "545", "472", "402", "332", "332", "262", "192", "122", "122"};
		ballX = Arrays.asList(ballArrayX);
		
		
		// { 542, 542, 542, 542, 472, 402, 332, 332, 262, 192, 122, 122 };
		String[] ballArrayY =  { "492", "422", "352", "282", "282", "282", "282", "212", "212", "212", "212", "142"};
		ballY = Arrays.asList(ballArrayY);
		//arcsX = new int[] { 535, 535, 535, 507, 437, 367, 332, 296, 225, 156, 126 };
		//arcsY = new int[] { 461, 393, 323, 282, 282, 282, 250, 212, 212, 212, 161 };
		keys = new String[] { "UP", "DOWN", "LEFT", "RIGHT" };
	}

	//Opens the door
	public int Rotate(double x, double y) {
		// TODO Auto-generated method stub
		int xInt = (int) x;
		int yInt = (int) y;

		int ballIndexX = ballX.indexOf(xInt+"") ;
		
		int ballIndexY = ballY.indexOf(yInt+"");
		
		if (ballIndexX >= ballIndexY) {
			System.out.println(xInt + " X Model>" + ballIndexX);
			return ballIndexX+1;
		}else {
			System.out.println(yInt + " Y Model>" + ballIndexY);
			return ballIndexY+1;
		}
	}
}
