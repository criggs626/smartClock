package com.riggs.smartClock;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimerTask;
import javafx.scene.text.Text;

public class ClockTicker extends TimerTask {

    Text t = new Text();
    Text t2 = new Text();

    @Override
    public void run() {
        DateFormat df = new SimpleDateFormat("HH:mm:ss");
        Date dateobj = new Date();

        t.setText(df.format(dateobj));

        df = new SimpleDateFormat("MM/dd/yy");
        dateobj = new Date();
        t2.setText(df.format(dateobj));
    }

    public void setT(Text first, Text second) {
        t = first;
        t2 = second;
    }

}
