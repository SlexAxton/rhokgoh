//
//  HomeViewController.m
//  rhokgoh
//
//  Created by JEI GAITHER on 6/2/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "HomeViewController.h"
#import <QuartzCore/QuartzCore.h>

@interface HomeViewController ()

@end

@implementation HomeViewController

@synthesize monthVisualView = _monthVisualView;
@synthesize statsVisualView = _statsVisualView;


#pragma mark UIImageView convenience methods...
-(UIImage*)imageWithImage: (UIImage*)sourceImage scaledToWidth:(float)i_width
{
    float oldWidth = sourceImage.size.width;
    float scaleFactor = i_width / oldWidth;
	
    float newHeight = sourceImage.size.height * scaleFactor;
    float newWidth = oldWidth * scaleFactor;
	
    UIGraphicsBeginImageContext(CGSizeMake(newWidth, newHeight));
    [sourceImage drawInRect:CGRectMake(0, 0, newWidth, newHeight)];
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();    
    UIGraphicsEndImageContext();
    return newImage;
}

#pragma mark Campaign/Challenge/Checkin/Endorsement Visuals methods

-(IBAction)checkIn:(id)sender{
	[self.tabBarController setSelectedIndex:1];
}

-(void)displayCheckinVisuals{
    NSLog(@"displayCheckinVisuals()...");
    int weeks = 5;
    int days = 7;
    int itemWidth = _monthVisualView.bounds.size.width / days;
    int itemHeight = _monthVisualView.frame.size.height / weeks;
    UIColor *goodCheckin = [UIColor greenColor];
    UIColor *badCheckin = [UIColor redColor];
    
    for(int i=0;i<days;i++){
        for(int j=0;j<weeks;j++){
			UIColor *currentColor = ((i % 2 == 0) && (j % 2 == 0)) ? goodCheckin : badCheckin;
            UIView *currentDay = [[UIView alloc]initWithFrame:CGRectMake((itemWidth * i), (itemHeight * j), itemWidth, itemHeight)];
			currentDay.layer.borderWidth = 1;
			currentDay.layer.borderColor = [UIColor whiteColor].CGColor;
            [currentDay setBackgroundColor:currentColor];
            NSLog(@"displaying current day's visual...");
            [_monthVisualView addSubview:currentDay];
        }
    }
}

-(void)displayStatsVisuals{
	NSLog(@"displayStatsVisuals()...");
	int rows = 5;
    int cols = 7;
    float itemWidth = _statsVisualView.bounds.size.width / cols;
    float itemHeight = _statsVisualView.frame.size.height / rows;
    
    for(int i=0;i<cols;i++){
        for(int j=0;j<rows;j++){
			// Determine the background color of each Endorser box...
			UIColor *currentColor = [UIColor grayColor];
			
			// Create our Endorser Badge View...
            UIView *endorserBadge = [[UIView alloc]initWithFrame:CGRectMake((itemWidth * i), (itemHeight * j), itemWidth, itemHeight)];
			
			// Stylize border size and color via the UIView's layer...
			endorserBadge.layer.borderWidth = 1;
			endorserBadge.layer.borderColor = [UIColor whiteColor].CGColor;
			
			// Set our background color...
            [endorserBadge setBackgroundColor:currentColor];
			
			// Create an ImageView container for our Endorser's profile pic... 
			UIImageView *profilePicView = [[UIImageView alloc]initWithFrame:CGRectMake(0, 0, (itemWidth * 0.5), itemHeight)];
			
			// Massage our profile pic, scaling it to half the width of our badge...
			UIImage *profilePic = [self imageWithImage:[UIImage imageNamed:@"profile_pic1.jpg"] scaledToWidth:(float)(itemWidth * 0.5)];
			
			// Set the Image View's image...
			[profilePicView setImage:profilePic];
			
			// Add the Profile Pic View to our badge...
			[endorserBadge addSubview:profilePicView];
			
			// Add the amount pledged in a label field...
			UILabel *endorsementAmountLabel = [[UILabel alloc]initWithFrame:CGRectMake((itemWidth * 0.5), 0, (itemWidth * 0.5), itemHeight)];
			[endorsementAmountLabel setText:@"$2"];
			
			// Add our label to the badge...
			[endorserBadge addSubview:endorsementAmountLabel];

            [_statsVisualView addSubview:endorserBadge];
        }
    }
}

#pragma mark UI Lifecycle methods

- (void)viewDidLoad
{
    [super viewDidLoad];

	[self displayCheckinVisuals];
	[self displayStatsVisuals];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
    } else {
        return YES;
    }
}

@end
