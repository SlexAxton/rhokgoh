//
//  CalendarVisual.m
//  rhokgoh
//
//  Created by JEI GAITHER on 6/2/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "CalendarVisual.h"

@implementation CalendarVisual

@synthesize checkins = _checkins;

- (id)initWithFrame:(CGRect)frame{
    self = [super initWithFrame:frame];
    if (self) {
        [self displayCheckinVisuals];
    }
    return self;
}

-(void)displayCheckinVisuals{
    NSLog(@"displayCheckinVisuals");
    int weeks = 5;
    int days = 7;
    int itemWidth = 10;
    int itemHeight = 10;
    UIColor *goodCheckin = [UIColor greenColor];
    UIColor *badCheckin = [UIColor redColor];
    
    for(int i=0;i<days;i++){
        for(int j=0;j<weeks;j++){
            UIView *currentDay = [[UIView alloc]initWithFrame:CGRectMake((itemWidth * i), (itemHeight * i), itemWidth, itemHeight)];
            [currentDay setBackgroundColor:goodCheckin];
            NSLog(@"displaying current day's visual...");
            [self addSubview:currentDay];
        }
    }
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect
{
    // Drawing code
}
*/

@end
