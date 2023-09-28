/**************************************************************************/
/* LabWindows/CVI User Interface Resource (UIR) Include File              */
/*                                                                        */
/* WARNING: Do not add to, delete from, or otherwise modify the contents  */
/*          of this include file.                                         */
/**************************************************************************/

#include <userint.h>

#ifdef __cplusplus
    extern "C" {
#endif

     /* Panels and Controls: */

#define  PANEL                            1
#define  PANEL_COMMANDBUTTON              2       /* control type: command, callback function: OKBUTTON */
#define  PANEL_PICTURE                    3       /* control type: picture, callback function: PICTURE */
#define  PANEL_TEXTMSG                    4       /* control type: textMsg, callback function: (none) */
#define  PANEL_TEXTMSG_2                  5       /* control type: textMsg, callback function: (none) */
#define  PANEL_DECORATION                 6       /* control type: deco, callback function: (none) */


     /* Control Arrays: */

#define  CTRLARRAY                        1

     /* Menu Bars, Menus, and Menu Items: */

          /* (no menu bars in the resource file) */


     /* Callback Prototypes: */

int  CVICALLBACK OKBUTTON(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK PICTURE(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);


#ifdef __cplusplus
    }
#endif
