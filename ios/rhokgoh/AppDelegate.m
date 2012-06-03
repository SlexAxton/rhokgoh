//
//  AppDelegate.m
//  rhokgoh
//
//  Created by JEI GAITHER on 6/2/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#define kBgQueue dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0) //1
#define kCampaignURL [NSURL URLWithString: @"http://someserver.com?campaign_id=10001"] //2

#import "AppDelegate.h"

@implementation AppDelegate

@synthesize window = _window;
@synthesize server_data = _server_data;
@synthesize campaigns = _campaigns;
@synthesize challenges = _challenges;
@synthesize checkins = _checkins;
@synthesize endorsements = _endorsements;
@synthesize user_data = _user_data;

#pragma mark Server Connectivity Methods...

- (void)fetchedData:(NSData *)responseData {
    //parse out the json data
    NSError* error;
    _server_data = [NSJSONSerialization JSONObjectWithData:responseData //1
                                                         options:kNilOptions 
                                                           error:&error];
    

    // NSArray* latestLoans = [json objectForKey:@"loans"]; //2

//    NSLog(@"loans: %@", latestLoans); //3
    
    // 1) Get the latest loan

    //convert object to data
    //NSData* jsonData = [NSJSONSerialization dataWithJSONObject:info 
    //                                                   options:NSJSONWritingPrettyPrinted
    //                                                     error:&error];
    
    //print out the data contents
    //jsonSummary.text = [[NSString alloc] initWithData:jsonData
    //                                         encoding:NSUTF8StringEncoding];
    
}

-(BOOL)initializeUserInfo{
    [_user_data setValue:@"10001" forKey:@"fundraiser_id"];
    [_user_data setValue:@"10001" forKey:@"campaign_id"];
    
    return true;
}

-(NSMutableArray*)getEndorsementsForChallengeByID:(int)challengeID{
    return [_server_data objectForKey:@"endorsements"];
}

-(NSMutableArray*)getChallengesForCampaignByID:(int)campaignID{
    return [_server_data objectForKey:@"campaigns"];
}

-(NSMutableArray*)getCampaignsForUserByID:(int)userID{
    return [_server_data objectForKey:@"campaigns"];
}

-(NSMutableArray*)getCheckinsForChallengeByID:(int)challengeID{
    return [_server_data objectForKey:@"checkins"];
}

-(NSDictionary*)getUserDataByID:(int)userID{
    //_server_data - DEBUG
    int challengeID = 10001;
    int campaignID = 1001;
    
    // Get a list of the Campaigns for the User...
    _campaigns = [self getCampaignsForUserByID:userID];
    
    // Each Campaign carries 1 to N Challenges
    //  A Challenge consists of a Goal tied to a Fundraising Campaign
    //  E.g. Quit Smoking, Lose Weight, etc.
    
    // Each Challenge requires Checkins at various, regular intervals
    
    _challenges = [self getChallengesForCampaignByID:campaignID];
    _checkins = [self getCheckinsForChallengeByID:challengeID];
    
    
    return _server_data;
}

#pragma mark lifecycle methods

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Get our latest data from the server...
    dispatch_async(kBgQueue, ^{
        NSData* data = [NSData dataWithContentsOfURL: kCampaignURL];
        [self performSelectorOnMainThread:@selector(fetchedData:) withObject:data waitUntilDone:YES];
    });    return YES;
}
							
- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end
