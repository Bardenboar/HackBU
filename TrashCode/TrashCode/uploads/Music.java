package application;

import java.io.File;

import javafx.scene.media.Media;
import javafx.scene.media.MediaPlayer;

public class Music {

		String path;
	public Music() {
		path = "D:/gong.wav";
		Media media = new Media(new File(path).toURI().toString());
		 MediaPlayer mediaPlayer = new MediaPlayer(media);
		 mediaPlayer.setAutoPlay(true);
	}

}
