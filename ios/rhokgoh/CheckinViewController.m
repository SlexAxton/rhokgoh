//
//  
//  CheckinViewController.m
//  rhokgoh
//
//  Created by JEI GAITHER on 6/2/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "CheckinViewController.h"

@interface CheckinViewController ()

@end

@implementation CheckinViewController

@synthesize app_delegate = _app_delegate;
@synthesize comments = _comments;
@synthesize picker = _picker;
@synthesize selectedImage = _selectedImage;

- (void)viewDidLoad
{
    [super viewDidLoad];
	_app_delegate = (AppDelegate*)[[UIApplication sharedApplication]delegate];
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

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)Picker {
	NSLog(@"imagePickerControllerDidCancel()...");
	[self dismissModalViewControllerAnimated:YES];
	
}

- (void)imagePickerController:(UIImagePickerController *)Picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
	NSLog(@"imagePickerController() didFinishish...");
	_selectedImage = [info objectForKey:UIImagePickerControllerOriginalImage];
	
	[self dismissModalViewControllerAnimated:YES];
	
}

#pragma mark Checkin methods...

-(IBAction)hideKeyboard:(id)sender{
	[_comments resignFirstResponder];
}

-(IBAction)addPicture:(id)sender{
	NSLog(@"addPicture()...");
	[_comments resignFirstResponder];
	
	_picker = [[UIImagePickerController alloc] init];

		_picker.delegate = self;

	// TODO: There is an issue on iPad where the UIImagePicker causes a crash when
	// not housed in a popover view.

//		_picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
//		_picker.navigationBar.opaque = true;
//		
//		//put the image picker in its own container controller, to control its size
//		UIViewController *containerController = [[UIViewController alloc] init];
//		containerController.contentSizeForViewInPopover = rightPane.frame.size;
//		[containerController.view addSubview:_picker.view];
//		
//		//then, put the container controller in the popover
//		popover = [[UIPopoverController alloc] initWithContentViewController:containerController];
//		
//		//Actually, I would like to do the following, but iOS doesn't let me:
//		//[rightPane addSubview:imagePicker.view];
//		
//		//So, put the popover over my rightPane. You might want to change the parameters to suit your needs.
//		[popover presentPopoverFromRect:CGRectMake(0.0, 0.0, 10.0,0.0) 
//								 inView:rightPane
//			   permittedArrowDirections:UIPopoverArrowDirectionLeft
//							   animated:YES];
//		
//		//There seems to be some nasty bug because of the added layer (the container controller), so you need to call this now and each time the view rotates (see below)
//		[imagePicker.view setFrame:containerController.view.frame];
//	}
	
	
	
	
	
	if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera])
		
	{
		
		_picker.sourceType = UIImagePickerControllerSourceTypeCamera;
		
	} else
		
	{
		
		_picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
		
	}
	
	[self presentModalViewController:_picker animated:YES];
	
}

-(IBAction)processCheckIn:(id)sender{
	NSLog(@"processCheckIn()...");
	NSLog(@"comments: %@",_comments.text);
	[_comments resignFirstResponder];
	[self.tabBarController setSelectedIndex:0];
}

#pragma mark Social Media functions...
-(IBAction)shareOnTwitter:(id)sender{
	[_comments resignFirstResponder];
	NSLog(@"shareOnTwitter()...");
}


-(IBAction)shareOnFacebook:(id)sender{
	[_comments resignFirstResponder];
	NSLog(@"shareOnFacebook()...");
}

@end
