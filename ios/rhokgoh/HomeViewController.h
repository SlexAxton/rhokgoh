//
//  HomeViewController.h
//  rhokgoh
//
//  Created by JEI GAITHER on 6/2/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface HomeViewController : UIViewController {
	UIView *_monthVisualView;
	UIView *_statsVisualView;
}

@property (nonatomic, retain) IBOutlet UIView *monthVisualView;
@property (nonatomic, retain) IBOutlet UIView *statsVisualView;

@end
