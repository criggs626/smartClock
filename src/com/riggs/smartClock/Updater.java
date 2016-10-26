package com.riggs.smartClock;

import java.io.File;
import java.util.TimerTask;
import javafx.scene.image.Image;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundImage;
import javafx.scene.layout.BackgroundPosition;
import javafx.scene.layout.BackgroundRepeat;
import javafx.scene.layout.BackgroundSize;
import javafx.scene.layout.BorderPane;

public class Updater extends TimerTask{
    BorderPane borderPane;
    
    @Override
    public void run() {
        File file = new File("img//active.jpg");
        Image image = new Image(file.toURI().toString());
        BackgroundImage myBI = new BackgroundImage(image,
                BackgroundRepeat.NO_REPEAT, BackgroundRepeat.NO_REPEAT, BackgroundPosition.CENTER,
                new BackgroundSize(100, 100, true, true, true, true));
        borderPane.setBackground(new Background(myBI));
    }
    
    public void set(BorderPane pane){
        borderPane=pane;
    }
    
    public void setOriginal(){
        File file = new File("img//active.jpg");
        Image image = new Image(file.toURI().toString());
        BackgroundImage myBI = new BackgroundImage(image,
                BackgroundRepeat.NO_REPEAT, BackgroundRepeat.NO_REPEAT, BackgroundPosition.CENTER,
                new BackgroundSize(100, 100, true, true, true, true));
        borderPane.setBackground(new Background(myBI));
    }
    
}
