package rhokgoh.android;

import rhokgoh.android.R;

import android.app.TabActivity;
import android.content.Intent;
import android.content.res.Resources;
import android.os.Bundle;
import android.widget.TabHost;

public class CheckinWidget extends TabActivity {
	
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		
		Resources res = getResources();
		TabHost tabHost = getTabHost();
		TabHost.TabSpec spec;
		Intent intent;
		
		intent = new Intent().setClass(this, CampaignActivity.class);
		spec = tabHost.newTabSpec("campaign").setIndicator("campaign")
				.setContent(intent);
		tabHost.addTab(spec);
		
		intent = new Intent().setClass(this, ChallengesActivity.class);
		spec = tabHost.newTabSpec("challenges").setIndicator("challenges")
				.setContent(intent);
		tabHost.addTab(spec);
		
		intent = new Intent().setClass(this, DonationsActivity.class);
		spec = tabHost.newTabSpec("donations").setIndicator("donations")
				.setContent(intent);
		tabHost.addTab(spec);
		
		intent = new Intent().setClass(this, ShareActivity.class);
		spec = tabHost.newTabSpec("share").setIndicator("share")
				.setContent(intent);
		tabHost.addTab(spec);
		
		tabHost.setCurrentTab(0);
	}

}
