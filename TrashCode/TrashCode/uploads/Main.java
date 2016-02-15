package application;

import java.util.HashMap;

import javafx.application.*;
import javafx.event.*;
import javafx.fxml.*;
import javafx.stage.*;
import javafx.scene.*;
import javafx.scene.shape.Arc;
import javafx.scene.shape.Sphere;

public class Main extends Application {

	static HashMap<String, String> values;
	boolean Flag = false;

	@Override
	public void start(Stage primaryStage) {
		try {
			Parent root = FXMLLoader.load(getClass().getResource("Gui.fxml"));
			Scene scene = new Scene(root, 470, 470);
			primaryStage.setScene(scene);
			primaryStage.setTitle("JS793");
			scene.setOnKeyReleased(new EventHandler<javafx.scene.input.KeyEvent>() {
				
				@Override
				public void handle(javafx.scene.input.KeyEvent event) {

					String sKey = event.getCode().toString();
					if (values.containsKey(sKey)) {

						System.out.println("Pressed>" + event.getCode());
						Sphere s = (Sphere) root.lookup("#ball");
						
						switch (sKey) {
						case "UP":
							if ( Flag) {
								s.setLayoutY(s.getLayoutY() - 70);
								int y = (int) (s.getLayoutY() - 70);
								System.out.println("X:" + s.getLayoutX() + "Y:" + y);
								Flag = false;
							
							}

							break;
						case "DOWN":
							if (Flag) {
								s.setLayoutY(s.getLayoutY() + 70);
								int y = (int) (s.getLayoutY() + 70);
								System.out.println("X:" + s.getLayoutX() + "Y:" + y);
								Flag = false;
								
							}

							break;
						case "LEFT":

							if (Flag) {
								s.setLayoutX(s.getLayoutX() - 70);
								int x = (int) (s.getLayoutX() - 70);
								System.out.println("X:" + x + "Y:" + s.getLayoutY());
								Flag = false;
							
							}
							break;
						case "RIGHT":
							if ( Flag) {
								s.setLayoutX(s.getLayoutX() + 70);
								int x = (int) (s.getLayoutX() + 70);
								System.out.println("X:" + x + "Y:" + s.getLayoutY());
								Flag = false;
								
							}
							break;
						case "ENTER":
							int pos = new Model().Rotate(s.getLayoutX(), s.getLayoutY());
							String sPos = "#ani"+pos;
							try{
								Arc arc = (Arc) root.lookup(sPos);
								double a= arc.getStartAngle();
								double aFinal;
								if(a>0){
									aFinal = a+180;
								}else{
									aFinal=a-180;
								}
								arc.setStartAngle(aFinal);
								Music music = new Music();

							}catch(Exception e){
								System.out.println(e+"");
							}
							
							int x = (int) s.getLayoutX();
							int y = (int) s.getLayoutY();
							System.out.println("Enter : X:" + x + " Y:" + y);
							Flag = true;

						}

					}

				}

			});

			primaryStage.show();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		values = new HashMap<String, String>();
		values.put("UP", "UP");
		values.put("DOWN", "DOWN");
		values.put("RIGHT", "RIGHT");
		values.put("LEFT", "LEFT");
		values.put("ENTER", "ENTER");

		launch(args);
	}
}
