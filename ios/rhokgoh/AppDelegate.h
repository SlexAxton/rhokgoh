//
//  AppDelegate.h
//  rhokgoh
//
//  Created by JEI GAITHER on 6/2/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>{

    NSMutableDictionary * _server_data;
    NSMutableArray *_campaigns;
    NSMutableArray *_challenges;
    NSMutableArray *_checkins;
    NSMutableArray *_endorsements;
    
    // User data
    NSMutableDictionary *_user_data;
    
}

@property (strong, nonatomic) UIWindow *window;
@property (nonatomic, retain) NSMutableDictionary *server_data;
@property (nonatomic, retain) NSMutableArray *campaigns;
@property (nonatomic, retain) NSMutableArray *challenges;
@property (nonatomic, retain) NSMutableArray *checkins;
@property (nonatomic, retain) NSMutableArray *endorsements;
@property (nonatomic, retain) NSMutableDictionary *user_data;

@end
