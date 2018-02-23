import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {DEFAULT_BREAKPOINTS, BreakPoint, BREAKPOINTS, validateSuffixes} from '@angular/flex-layout';

/**
 * For mobile and tablet, reset ranges
 */
function updateBreakpoints(bp:BreakPoint) {
  switch(bp.alias) {
    case 'xs' : bp.mediaQuery =  '(max-width: 470px)';   break;
    case 'sm' : bp.mediaQuery =  '(max-width: 768px)'; break;
  }
  return bp;
}

@NgModule({
  imports : [ FlexLayoutModule ],
  exports : [ FlexLayoutModule ],
  providers: [
    // register a Custom BREAKPOINT Provider
    {
      provide : BREAKPOINTS,
      useFactory : function customizeBreakPoints() {
        return validateSuffixes(DEFAULT_BREAKPOINTS.map( updateBreakpoints ));
      }
    }
  ]
})
export class MyBreakPointsModule { }