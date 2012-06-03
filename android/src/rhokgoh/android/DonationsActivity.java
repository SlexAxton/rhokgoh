package rhokgoh.android;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class DonationsActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        TextView tv = new TextView(this);
        tv.setText("This is the donations tab");
        setContentView(tv);
    }
}