config.FollowScroll=!1;var fscrl=new tt_Extension;fscrl.OnShow=function(){if(tt_aV[FOLLOWSCROLL]){if(tt_aV[STICKY]){var t=tt_x-tt_GetScrollX(),l=tt_y-tt_GetScrollY();return tt_ie?(fscrl.MoveOnScrl.offX=t,fscrl.MoveOnScrl.offY=l,fscrl.AddRemEvtFncs(tt_AddEvtFnc)):(tt_SetTipPos(t,l),tt_aElt[0].style.position="fixed"),!0}tt_aV[FOLLOWSCROLL]=!1}return!1},fscrl.OnHide=function(){tt_aV[FOLLOWSCROLL]&&(tt_ie?fscrl.AddRemEvtFncs(tt_RemEvtFnc):tt_aElt[0].style.position="absolute")},fscrl.MoveOnScrl=function(){tt_SetTipPos(fscrl.MoveOnScrl.offX+tt_GetScrollX(),fscrl.MoveOnScrl.offY+tt_GetScrollY())},fscrl.AddRemEvtFncs=function(t){t(window,"resize",fscrl.MoveOnScrl),t(window,"scroll",fscrl.MoveOnScrl)};