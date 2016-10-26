/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.riggs.smartClock;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.TimerTask;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.Text;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 *
 * @author Caleb
 */
public class Weather extends TimerTask {

    Text t1;
    Text t2;
    Text t3;

    public JSONObject getWeather() {
        JSONParser parser = new JSONParser();

        String response = "";

        JSONObject result = new JSONObject();

        String city = "St.Petersburg";
        try {
            BufferedReader locale = new BufferedReader(new FileReader("img//city.txt"));
            city = locale.readLine();

        } catch (Exception e) {
            System.out.print(e);
        }

        try {
            URL url = new URL("http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&&units=imperial&&APPID=b7be14db38278a763b2c5702ed1ba1d2");
            BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()));
            String strTemp = "";
            while (null != (strTemp = br.readLine())) {
                response += strTemp;
            }
            Object weather = parser.parse(response);
            JSONObject weatherJSON = (JSONObject) weather;

            JSONArray tempArray = (JSONArray) weatherJSON.get("weather");
            JSONObject tempJSON = (JSONObject) tempArray.get(0);
            result.put("description", tempJSON.get("description"));

            tempJSON = (JSONObject) weatherJSON.get("main");
            result.put("temp", tempJSON.get("temp"));
            result.put("city", weatherJSON.get("name"));

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result;

    }
    
    public void setT(Text s1,Text s2,Text s3){
        t1=s1;
        t2=s2;
        t3=s3;
        run();
    }

    @Override
    public void run() {
        JSONObject result = getWeather();

        t1.setText(result.get("temp").toString() + "° F");

        t2.setText(result.get("description").toString());

        t3.setText(result.get("city").toString());

    }
}
