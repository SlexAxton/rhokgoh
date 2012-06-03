package rhokgoh.android;

import rhokgoh.android.R;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class ShareActivity extends Activity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        TextView tv = new TextView(this);
        tv.setText("This is the sharing tab");
        setContentView(R.layout.checkin);
    }
}