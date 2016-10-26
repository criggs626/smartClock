package com.riggs.smartClock;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.Text;

public class Events {

    private Statement statmentItem;

    public void initialize() {
        Connection conn = (null);

        try {
            conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost/test", "root", "");

            statmentItem = conn.createStatement();

        } catch (SQLException ex) {
            // handle any exceptions
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("Error code: " + ex.getErrorCode());
        }
    }

    public String[][] getEvents() {
        List<String> tempRow = new ArrayList<String>();
        List<String[]> temp = new ArrayList<String[]>();
        try {
            ResultSet rs = statmentItem.executeQuery("SELECT * FROM EVENTS ORDER BY time");

            SimpleDateFormat df = new SimpleDateFormat("MM/dd/yyyy");
            Date dateobj = new Date();
            String date = (df.format(dateobj));

            while (rs.next()) {
                if (rs.getString("time").substring(0, 10).equals(date)) {
                    tempRow.add(rs.getString("id"));
                    tempRow.add(rs.getString("description"));
                    tempRow.add(rs.getString("location"));
                    tempRow.add(rs.getString("time"));
                    String[] simpleArray = new String[tempRow.size()];
                    temp.add(tempRow.toArray(simpleArray));
                    tempRow.clear();
                }
            }

        } catch (SQLException ex) {
            // handle any exceptions
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("Error code: " + ex.getErrorCode());
        }
        String[][] simpleArray = new String[temp.size()][temp.size()];

        temp.toArray(simpleArray);

        //for (int i=0;i<simpleArray.length;i++){
        //    for(int j=0;j<simpleArray[i].length;j++){
        //        System.out.println(simpleArray[i][j]);
        //    }  
        //}
        return simpleArray;
    }

    public HBox addEvents(String[][] events) {
        HBox returnBox = new HBox();
        for (int i = 0; i < events.length; i++) {
            VBox eventBox = new VBox();
            for (int j = 1; j < events[i].length; j++) {
                Text tempText = new Text();
                tempText.setFill(Color.WHITE);
                tempText.setFont(Font.font("Verdan", 20));
                tempText.setText(events[i][j]);
                eventBox.getChildren().add(tempText);
            }
            returnBox.getChildren().add(eventBox);
        }
        returnBox.setSpacing(100);

        return returnBox;
    }

    public HBox run() {
        initialize();
        HBox test = addEvents(getEvents());
        return test;
    }

}
