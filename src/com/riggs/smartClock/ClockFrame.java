package com.riggs.smartClock;

import java.util.Timer;
import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.Text;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;

public class ClockFrame extends Application {

    public static void main(String[] args) {
        Application.launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        Text clock = new Text("Initializing...");
        clock.setFill(Color.WHITE);
        clock.setFont(Font.font("Verdan", 100));

        Text date = new Text();
        date.setFill(Color.WHITE);
        date.setFont(Font.font("Verdan", 50));

        VBox time = new VBox();
        time.getChildren().addAll(clock, date);

        Timer clockUpdate = new Timer();
        ClockTicker ticktock = new ClockTicker();
        ticktock.setT(clock, date);
        clockUpdate.scheduleAtFixedRate(ticktock, 1000, 1000);

        VBox weather = new VBox();
        Weather forecast = new Weather();
        forecast.setWeather(weather);

        BorderPane borderPane = new BorderPane();
        borderPane.setRight(time);
        borderPane.setLeft(weather);
        
        try {
            Events eventManager = new Events();
            borderPane.setBottom(eventManager.run());

        } catch (Exception e) {
            System.out.print("Did you turn on the database??? \n You should turn it on now.");
        }
        
        Timer genUpdate = new Timer();
        Updater update = new Updater();
        update.set(borderPane);
        update.setOriginal();
        genUpdate.scheduleAtFixedRate(update, 10000, 10000);

        Scene scene = new Scene(borderPane, Color.BLACK);
        primaryStage.setScene(scene);
        primaryStage.setFullScreen(true);
        primaryStage.show();
        primaryStage.setOnCloseRequest(new EventHandler<WindowEvent>() {
            @Override
            public void handle(WindowEvent event) {
                System.out.println("Closing...");
                System.exit(0);
            }
        });

    }
}
