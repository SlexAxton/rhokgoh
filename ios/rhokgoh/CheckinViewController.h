//
//  CheckinViewController.h
//  rhokgoh
//
//  Created by JEI GAITHER on 6/2/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AppDelegate.h"

@interface CheckinViewController : UIViewController{
    AppDelegate *_app_delegate;
	UITextView *_comments;
	
	UIImagePickerController *_picker;
	UIImage * _selectedImage;
}

@property (nonatomic, retain) AppDelegate *app_delegate;
@property (nonatomic, retain) IBOutlet UITextView *comments;
@property (nonatomic, retain) UIImagePickerController *picker;
@property (nonatomic, retain) UIImage *selectedImage;

-(IBAction)shareOnFacebook:(id)sender;
-(IBAction)shareOnTwitter:(id)sender;
-(IBAction)processCheckIn:(id)sender;
-(IBAction)addPicture:(id)sender;
-(IBAction)hideKeyboard:(id)sender;

@end
