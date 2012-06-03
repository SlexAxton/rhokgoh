package rhokgoh.android;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.View;
import android.widget.TableLayout;
import android.widget.TableRow;

public class CalendarTable extends TableLayout {

	public CalendarTable(Context context) {
		super(context);
		setStretchAllColumns(true);
		for(int i=0; i < 7; i++) {
			TableRow row = new TableRow(context);
			for(int j=0; j < 5; j++) {
				View cell = new View(context);
				if(i % 2 == 0) {
					cell.setBackgroundColor(Color.BLUE);
				} else {
					cell.setBackgroundColor(Color.GREEN);
				}
				row.addView(cell);
			}
			this.addView(row);
		}
	}
	
	public CalendarTable(Context context, AttributeSet attrs) {
		super(context, attrs);
		setStretchAllColumns(true);
		for(int i=0; i < 7; i++) {
			TableRow row = new TableRow(context, attrs);
			for(int j=0; j < 5; j++) {
				View cell = new View(context, attrs);
				if(i % 2 == 0) {
					cell.setBackgroundColor(Color.BLUE);
				} else {
					cell.setBackgroundColor(Color.GREEN);
				}
				row.addView(cell);
			}
			this.addView(row);
		}
	}
}
